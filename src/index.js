import express  from 'express';
import helmet   from 'helmet';
import cors     from 'cors';
import morgan   from 'morgan';

// Clearing cache
clearAllCache();

// App initialisation
const port = 5000;
const app = express()
    // Settings
    .use(cors({origin: 'http://localhost:3000'}))
    .use(express.json())
    .use(helmet())
    .use(helmet.contentSecurityPolicy())
    .use(helmet.hidePoweredBy())
    .use(express.urlencoded({extended: true}))
    .use(morgan(":date \: :remote-addr - :method :url | :status | :response-time ms | :res[content-length]"))

    // Routes
    //.use('/w', wRoutes)

    // Starting the server
    .listen(port, () => {console.log(`Server listening on port ${port}.`);})
;