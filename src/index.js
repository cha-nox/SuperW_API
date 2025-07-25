import express              from 'express';
import helmet               from 'helmet';
import morgan               from 'morgan';
import cors                 from 'cors';
import fs                   from 'fs';
import path, { dirname }    from 'path';
import { fileURLToPath }    from 'url';

import authRoutes           from './routes/auth.js';
import csrfRoutes           from './routes/csrf.js';
import productRoutes        from './routes/product.js';
import statsRoutes          from './routes/stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Creating the uploads folder if it doesn't exist yet
if(!fs.existsSync('uploads')){fs.mkdirSync('uploads');};

// App initialisation
const port  = 5000;
const app   = express()
    // Settings
    .use(cors({
        origin: 'http://localhost:3000',
        exposedHeaders: ['X-CSRF-token']
    }))
    .use(express.json())
    .use(helmet({crossOriginResourcePolicy: {policy: "cross-origin"}}))
    .use(helmet.contentSecurityPolicy())
    .use(helmet.hidePoweredBy())
    .use(express.urlencoded({extended: true}))
    .use('/uploads', express.static('uploads'))
    .use(morgan(':date \: :remote-addr - :method :url | :status | :response-time ms | :res[content-length]'))

    // Routes
    .use('/', authRoutes)
    .use('/csrf', csrfRoutes)
    .use('/product', productRoutes)
    .use('/stats', statsRoutes)
    .use('/.well-known', express.static(path.join(__dirname, '.well-known')))

    // Starting the server
    .listen(port, () => {console.log(`Server listening on port ${port}.`);})
;