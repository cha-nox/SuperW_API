import express from 'express';

const router = express.Router();

router.post('/', express.json({ type: ['json', 'application/csp-report'] }), (req, res) => {
    console.warn('🛡️ CSP Violation Report:', JSON.stringify(req.body, null, 2));
    res.status(204).end(); // pas de réponse nécessaire
});

export default router;