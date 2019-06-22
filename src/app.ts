import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import schema from './graṕhql/schema';
import * as cors from 'cors';
//import mongoose from './connect/DBConnect';
import { extractJwtMiddleware } from './middlewares/extract.jwt.middleware';

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        //console.log(cors)
        this.express.use(cors())
        this.middleware()
    }

    private middleware(): void {
        console.log(process.env.NODE_ENV)
        this.express.use('/graphql',

            extractJwtMiddleware(),
            (req, res, next) => {
                console.log('AQUI')
                console.log('AQUI', req['context'])

                //req['context'].mongoose = mongoose;
                next();
            }, graphqlHTTP((req) => ({
                schema: schema,
                graphiql: process.env.NODE_ENV === 'development',
                //context: req['context']
            })))
    }
}

export default new App().express;