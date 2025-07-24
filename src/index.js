import cors             from 'cors';
import express          from 'express';
import helmet           from 'helmet';
import morgan           from 'morgan';
import authRoutes       from './routes/auth.js';
import csrfRoutes       from './routes/csrf.js';
import productRoutes    from './routes/product.js';
import statsRoutes      from './routes/stats.js';

// App initialisation
const port  = 5000;
const app   = express()
    // Settings
    .use(cors({
        origin: 'http://localhost:3000',
        exposedHeaders: ['X-CSRF-token'] 
    }))
    .use(express.json())
    .use(helmet())
    .use(helmet.contentSecurityPolicy())
    .use(helmet.hidePoweredBy())
    .use(express.urlencoded({extended: true}))
    .use(morgan(':date \: :remote-addr - :method :url | :status | :response-time ms | :res[content-length]'))

    // Routes
    .use('/', authRoutes)
    .use('/csrf', csrfRoutes)
    .use('/product', productRoutes)
    .use('/stats', statsRoutes)

    // Starting the server
    .listen(port, () => {console.log(`Server listening on port ${port}.`);})
;