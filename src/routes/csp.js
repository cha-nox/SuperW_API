import express from 'express';
import authenticateToken    from '../middlewares/authenticateToken.js';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Récupérer le chemin du fichier courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import path from 'path'
const cspReportsFile = path.join(__dirname, '..', 'logs', 'csp-reports.json');

const router = express.Router();

router.post('/', express.json({ type: ['json', 'application/csp-report'] }), (req, res) => {
    console.warn('🛡️ CSP Violation Report:', JSON.stringify(req.body, null, 2));

    let reports = [];
    if (fs.existsSync(cspReportsFile)) {
        const content = fs.readFileSync(cspReportsFile, 'utf8');
        reports = content ? JSON.parse(content) : [];
    }

    reports.push({
        timestamp: new Date(),
        report: req.body['csp-report'] || req.body
    });

    fs.writeFileSync(cspReportsFile, JSON.stringify(reports, null, 2));

    res.status(204).end();
});

router.get('/get-json', authenticateToken, (req, res) => {
    if (fs.existsSync(cspReportsFile)) {
        const content = fs.readFileSync(cspReportsFile, 'utf8');
        const reports = content ? JSON.parse(content) : [];
        res.json(reports);
    } else {
        res.json([]);
    }
});

export default router;