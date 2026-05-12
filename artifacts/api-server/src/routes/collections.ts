import { Router, type IRouter } from "express";
import { db, collectionsTable, productsTable } from "@workspace/db";
import { ListCollectionsResponse } from "@workspace/api-zod";
import { count } from "drizzle-orm";

const router: IRouter = Router();

router.get("/collections", async (_req, res): Promise<void> => {
  const collections = await db.select().from(collectionsTable).orderBy(collectionsTable.id);
  res.json(ListCollectionsResponse.parse(collections));
});

router.get("/explore/summary", async (_req, res): Promise<void> => {
  const [{ total }] = await db.select({ total: count() }).from(productsTable);

  res.json({
    totalProducts: total,
    newArrivalsCount: 8,
    trendingCount: 6,
    topBrands: ["Ray-Ban", "Eyespecx", "Oakley", "Warby Parker", "Lindberg"],
    priceRanges: [
      { label: "Under ₹1,500", min: 0, max: 1500 },
      { label: "₹1,500 – ₹3,000", min: 1500, max: 3000 },
      { label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
      { label: "Above ₹5,000", min: 5000, max: 99999 },
    ],
  });
});

export default router;
