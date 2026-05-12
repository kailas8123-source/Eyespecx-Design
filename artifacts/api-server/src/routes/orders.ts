import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, ordersTable, orderLineItemsTable, productsTable, cartItemsTable } from "@workspace/db";
import {
  CreateOrderBody,
  GetOrderParams,
  ListOrdersResponse,
  GetOrderResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function getOrderWithItems(orderId: number) {
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId));
  if (!order) return null;

  const lineItems = await db
    .select({
      id: orderLineItemsTable.id,
      productId: orderLineItemsTable.productId,
      quantity: orderLineItemsTable.quantity,
      priceAtPurchase: orderLineItemsTable.priceAtPurchase,
      product: {
        id: productsTable.id,
        name: productsTable.name,
        brand: productsTable.brand,
        price: productsTable.price,
        originalPrice: productsTable.originalPrice,
        category: productsTable.category,
        type: productsTable.type,
        gender: productsTable.gender,
        frameColor: productsTable.frameColor,
        lensColor: productsTable.lensColor,
        material: productsTable.material,
        shape: productsTable.shape,
        imageUrl: productsTable.imageUrl,
        images: productsTable.images,
        rating: productsTable.rating,
        reviewCount: productsTable.reviewCount,
        isFeatured: productsTable.isFeatured,
        isNew: productsTable.isNew,
        isTrending: productsTable.isTrending,
        inStock: productsTable.inStock,
        description: productsTable.description,
        tags: productsTable.tags,
      },
    })
    .from(orderLineItemsTable)
    .leftJoin(productsTable, eq(orderLineItemsTable.productId, productsTable.id))
    .where(eq(orderLineItemsTable.orderId, orderId));

  return {
    ...order,
    createdAt: order.createdAt.toISOString(),
    items: lineItems,
  };
}

router.get("/orders", async (_req, res): Promise<void> => {
  const orders = await db.select().from(ordersTable).orderBy(ordersTable.createdAt);

  const ordersWithItems = await Promise.all(
    orders.map((o) => getOrderWithItems(o.id))
  );

  res.json(ListOrdersResponse.parse(ordersWithItems));
});

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const cartItems = await db
    .select({
      id: cartItemsTable.id,
      productId: cartItemsTable.productId,
      quantity: cartItemsTable.quantity,
      product: productsTable,
    })
    .from(cartItemsTable)
    .leftJoin(productsTable, eq(cartItemsTable.productId, productsTable.id));

  if (cartItems.length === 0) {
    res.status(400).json({ error: "Cart is empty" });
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price ?? 0) * item.quantity;
  }, 0);

  const [order] = await db.insert(ordersTable).values({
    status: "processing",
    total,
    shippingAddress: parsed.data.shippingAddress,
  }).returning();

  await db.insert(orderLineItemsTable).values(
    cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      priceAtPurchase: item.product?.price ?? 0,
    }))
  );

  // Clear cart
  await db.delete(cartItemsTable);

  const fullOrder = await getOrderWithItems(order.id);
  res.status(201).json(GetOrderResponse.parse(fullOrder));
});

router.get("/orders/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetOrderParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const order = await getOrderWithItems(params.data.id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json(GetOrderResponse.parse(order));
});

export default router;
