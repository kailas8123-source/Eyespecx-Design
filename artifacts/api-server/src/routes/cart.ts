import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, cartItemsTable, productsTable } from "@workspace/db";
import {
  AddToCartBody,
  UpdateCartItemBody,
  UpdateCartItemParams,
  RemoveCartItemParams,
  GetCartResponse,
  UpdateCartItemResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/cart", async (_req, res): Promise<void> => {
  const items = await db
    .select({
      id: cartItemsTable.id,
      productId: cartItemsTable.productId,
      quantity: cartItemsTable.quantity,
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
    .from(cartItemsTable)
    .leftJoin(productsTable, eq(cartItemsTable.productId, productsTable.id));

  res.json(GetCartResponse.parse(items));
});

router.post("/cart", async (req, res): Promise<void> => {
  const parsed = AddToCartBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db
    .select()
    .from(cartItemsTable)
    .where(eq(cartItemsTable.productId, parsed.data.productId));

  if (existing) {
    const [updated] = await db
      .update(cartItemsTable)
      .set({ quantity: existing.quantity + parsed.data.quantity })
      .where(eq(cartItemsTable.id, existing.id))
      .returning();

    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, updated.productId));
    res.status(201).json({ ...updated, product });
    return;
  }

  const [item] = await db.insert(cartItemsTable).values(parsed.data).returning();
  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, item.productId));
  res.status(201).json({ ...item, product });
});

router.patch("/cart/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateCartItemParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateCartItemBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [updated] = await db
    .update(cartItemsTable)
    .set({ quantity: body.data.quantity })
    .where(eq(cartItemsTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Cart item not found" });
    return;
  }

  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, updated.productId));
  res.json(UpdateCartItemResponse.parse({ ...updated, product }));
});

router.delete("/cart/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const [deleted] = await db
    .delete(cartItemsTable)
    .where(eq(cartItemsTable.id, id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Cart item not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
