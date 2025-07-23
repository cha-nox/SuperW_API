import { Router }       from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Product update route
const productUpdate = async (req, res, next) => {
    const updated_product = await prisma.product.update({
        data: {
            name:           req.body.name,
            description:    req.body.description,
            category:       req.body.category,
            price:          parseInt(req.body.price)
        },
        where: {id: parseInt(req.body.id)}
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).json({error: "Erreur lors de la modification du produit."});
    });

    return res.status(200).json({message: "Produit mis à jour avec succès !"});
};
router.patch('/update', productUpdate);

// Product deletion route
const productDelete = async (req, res, next) => {
    const deleted_product = await prisma.product.delete({
        where: {id: parseInt(req.body.id)}
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).json({error: "Erreur lors de la suppression du produit."});
    });

    return res.status(200).json({message: "Produit supprimé avec succès !"});
};
router.delete('/delete', productDelete);

// Product creation route
const productCreate = async (req, res, next) => {
    const new_product = await prisma.product.create({
        data: {
            name:           req.body.name,
            description:    req.body.description,
            category:       req.body.category,
            price:          parseInt(req.body.price)
        }
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).json({error: "Erreur lors de la création du produit."});
    });

    return res.status(201).json({message: "Produit créé avec succès !"});
};
router.put('/new', productCreate);

// Product list route
const productList = async (req, res, next) => {
    const product_list = await prisma.product.findMany();

    return res.status(200).json({
        message:        "Liste des produits",
        data_content:   product_list
    });
};
router.get('/list', productList);

// Exporting the routes
export default router;