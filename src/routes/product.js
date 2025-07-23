import { Router }       from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Product list route
const productList = async (req, res, next) => {
    const product_list = await prisma.product.findMany();

    res.json({
        message:        "Liste des produits",
        data_content:   product_list
    });
};
router.get("/list", productList);

// Exporting the routes
export default router;