import { Router, type IRouter } from "express";
import { eq, ilike, gte, lte, and, type SQL } from "drizzle-orm";
import { db, productsTable } from "@workspace/db";
import {
  ListProductsQueryParams,
  GetProductParams,
  GetProductResponse,
  ListProductsResponse,
  GetFeaturedProductsResponse,
  GetNewArrivalsResponse,
  GetTrendingProductsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/products", async (req, res): Promise<void> => {
  const query = ListProductsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const { category, gender, type, minPrice, maxPrice, search } = query.data;
  const conditions: SQL[] = [];

  if (category) conditions.push(eq(productsTable.category, category));
  if (gender) conditions.push(eq(productsTable.gender, gender));
  if (type) conditions.push(eq(productsTable.type, type));
  if (minPrice !== undefined) conditions.push(gte(productsTable.price, minPrice));
  if (maxPrice !== undefined) conditions.push(lte(productsTable.price, maxPrice));
  if (search) conditions.push(ilike(productsTable.name, `%${search}%`));

  const products = await db
    .select()
    .from(productsTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(productsTable.createdAt);

  res.json(ListProductsResponse.parse(products));
});

router.get("/products/featured", async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isFeatured, true))
    .limit(8);
  res.json(GetFeaturedProductsResponse.parse(products));
});

router.get("/products/new-arrivals", async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isNew, true))
    .limit(8);
  res.json(GetNewArrivalsResponse.parse(products));
});

router.get("/products/trending", async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isTrending, true))
    .limit(8);
  res.json(GetTrendingProductsResponse.parse(products));
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetProductParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, params.data.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(GetProductResponse.parse(product));
});

export default router;
