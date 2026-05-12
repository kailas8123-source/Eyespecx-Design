import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, reviewsTable, productsTable } from "@workspace/db";
import {
  ListReviewsQueryParams,
  CreateReviewBody,
  ListReviewsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/reviews", async (req, res): Promise<void> => {
  const query = ListReviewsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.productId, query.data.productId))
    .orderBy(reviewsTable.createdAt);

  const formatted = reviews.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  res.json(ListReviewsResponse.parse(formatted));
});

router.post("/reviews", async (req, res): Promise<void> => {
  const parsed = CreateReviewBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [review] = await db.insert(reviewsTable).values(parsed.data).returning();

  // Update product rating
  const allReviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.productId, parsed.data.productId));

  const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
  await db
    .update(productsTable)
    .set({ rating: Math.round(avgRating * 10) / 10, reviewCount: allReviews.length })
    .where(eq(productsTable.id, parsed.data.productId));

  res.status(201).json({ ...review, createdAt: review.createdAt.toISOString() });
});

export default router;
