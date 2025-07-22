import express  from 'express';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/authenticateToken.js';

const prisma = new PrismaClient();
const router = express.Router();

// Routes

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({ message: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: "Inscription réussie", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(403).json({ message: "Mot de passe incorrect" });
        }

        const payload = { id: user.id, email: user.email };
        const token = jwt.sign({ user: payload }, "TOP_SECRET", { expiresIn: "24h" });

        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.get("/test", authenticateToken, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.user.id },
    });
    res.json({ user });
});

export default router;