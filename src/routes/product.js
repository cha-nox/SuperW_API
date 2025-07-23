import { Router }       from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Product creation route
const productCreate = async (req, res, next) => {
    const new_product = await prisma.product.create({
        data: {
            name:           req.body.name,
            description:    req.body.description,
            category:       req.body.category,
            price:          parseInt(req.body.price)
        }
    });

    res.status(201).json({message: "Produit créé avec succès !"});
};
router.post('/new', productCreate);

// Product list route
const productList = async (req, res, next) => {
    const product_list = await prisma.product.findMany();

    res.status(200).json({
        message:        "Liste des produits",
        data_content:   product_list
    });
};
router.get('/list', productList);

// Exporting the routes
export default router;