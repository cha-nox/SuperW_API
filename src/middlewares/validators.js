import { authSchema } from "../schemas/AuthSchema.js";
import { ZodError } from "zod";

export const validateAuth = (req, res, next) => {
    try {
        authSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const zodErrors = {};

            error.issues.forEach(err => {
                const field = err.path[0];
                zodErrors[field] = err.message;
            });

            return res.status(400).json({ errors: zodErrors });
        }

        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Erreur lors de la validation" });
    }
};
