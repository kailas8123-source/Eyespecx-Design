import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, wishlistItemsTable, productsTable } from "@workspace/db";
import {
  AddToWishlistBody,
  RemoveWishlistItemParams,
  GetWishlistResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/wishlist", async (_req, res): Promise<void> => {
  const items = await db
    .select({
      id: wishlistItemsTable.id,
      productId: wishlistItemsTable.productId,
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
    .from(wishlistItemsTable)
    .leftJoin(productsTable, eq(wishlistItemsTable.productId, productsTable.id));

  res.json(GetWishlistResponse.parse(items));
});

router.post("/wishlist", async (req, res): Promise<void> => {
  const parsed = AddToWishlistBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db
    .select()
    .from(wishlistItemsTable)
    .where(eq(wishlistItemsTable.productId, parsed.data.productId));

  if (existing) {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, existing.productId));
    res.status(201).json({ ...existing, product });
    return;
  }

  const [item] = await db.insert(wishlistItemsTable).values(parsed.data).returning();
  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, item.productId));
  res.status(201).json({ ...item, product });
});

router.delete("/wishlist/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = RemoveWishlistItemParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(wishlistItemsTable)
    .where(eq(wishlistItemsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Wishlist item not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
