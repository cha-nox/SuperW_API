import { Router }           from 'express';
import { PrismaClient }     from '@prisma/client';
import authenticateToken    from '../middlewares/authenticateToken.js';
import { upload }           from '../middlewares/imageManagement.js';
import { verifyCsrfToken }  from '../middlewares/csrfToken.js';
import fs from 'fs/promises';
import path from 'path';

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
router.patch('/update', authenticateToken, verifyCsrfToken, upload.array('images', 5), productUpdate);

// Product deletion route
const productDelete = async (req, res, next) => {
    const {id} = req.body;

    if(!id){return res.status(400).json({error: "ID manquant."});};
    try{
        // Getting all images associated with the product
        const images = await prisma.images.findMany({
            where: {productId: parseInt(id)}}
        );

        // Deleting images from the uploads directory
        for(const image of images){
            const imagePath = path.join('uploads', path.basename(image.url));
            try{
                await fs.unlink(imagePath);
            }
            catch(error){
                console.warn(`Erreur suppression fichier : ${imagePath}`, error.message);
            };
        };

        // Deleting the product and its associated images from the database
        await prisma.product.delete({
            where: {id: parseInt(id)}
        });

        return res.status(200).json({message: "Produit et images associées supprimés avec succès."});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Erreur lors de la suppression du produit et/ou de ses images associées."});
    };
};
router.delete('/delete', authenticateToken, verifyCsrfToken, productDelete);

// Product creation route
const productCreate = async (req, res, next) => {
    const images        = req.files;
    const imagePaths    = images.map(file => ({url: `http://localhost:5000/uploads/${file.filename}`}));
    const new_product   = await prisma.product.create({
        data: {
            name:           req.body.name,
            description:    req.body.description,
            category:       req.body.category,
            images:         {create: imagePaths},
            price:          parseInt(req.body.price)
        },
        include: {images: true}
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).json({error: "Erreur lors de la création du produit."});
    });

    return res.status(201).json({message: "Produit créé avec succès !"});
};
router.put('/new', authenticateToken, verifyCsrfToken, upload.array('images', 5), productCreate);

// Product list route
const productList = async (req, res, next) => {
    const product_list = await prisma.product.findMany({include: {images: true}});

    return res.status(200).json({
        message:        "Liste des produits",
        data_content:   product_list
    });
};
router.get('/list', productList);

// Product details route
const productDetails = async (req, res, next) => {
    const product_details = await prisma.product.findUniqueOrThrow({
        where:      {id: parseInt(req.query.id)},
        include:    {images: true}
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).json({error: "Erreur lors de la récupération des détails du produit."});
    });

    return res.status(200).json({
        message:        "Détails du produit",
        data_content:   product_details
    });
};
router.get('/details', productDetails);

export default router;