import { Router }       from 'express';
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const stats = await prisma.product.groupBy({
      by: ["category"],
      _count: { category: true }
    });

    const formatted = stats.map(stat => ({
      nom: stat.category,
      compte: stat._count.category
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
