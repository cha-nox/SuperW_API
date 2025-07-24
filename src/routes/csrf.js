import { Router }               from 'express';
import { generateCsrfToken }    from '../middlewares/csrfToken.js';

const router = Router();

// CSRF token generation route
router.get('/generate_token', generateCsrfToken, (req, res) => {
    return res.status(200).json({message: "CSRF token generated successfully !"});
});

export default router;