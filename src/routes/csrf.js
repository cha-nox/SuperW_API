import { Router }               from 'express';
import { generateCsrfToken }    from '../middlewares/csrfToken.js';

const router = Router();

// CSRF token generation route
router.get('/generate_token', generateCsrfToken, (req, res) => {
    return res.status(200).json({csrf_token: res.locals.csrf_token});
});

export default router;