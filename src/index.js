import cors             from 'cors';
import express          from 'express';
import morgan           from 'morgan';
import authRoutes       from './routes/auth.js';
import csrfRoutes       from './routes/csrf.js';
import fs               from 'fs';
import productRoutes    from './routes/product.js';
import statsRoutes      from './routes/stats.js';

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
    .use(express.urlencoded({extended: true}))
    .use('/uploads', express.static('uploads'))
    .use(morgan(':date \: :remote-addr - :method :url | :status | :response-time ms | :res[content-length]'))

    // Routes
    .use('/', authRoutes)
    .use('/csrf', csrfRoutes)
    .use('/product', productRoutes)
    .use('/stats', statsRoutes)

    // Starting the server
    .listen(port, () => {console.log(`Server listening on port ${port}.`);})
;