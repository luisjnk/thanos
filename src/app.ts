import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import schema from './graṕhql/schema';
import * as cors from 'cors';

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        console.log(cors)
        this.express.use(cors())
        this.middleware()
    }

    private middleware(): void {
        console.log(process.env.NODE_ENV)
        this.express.use('/graphql', graphqlHTTP({
            schema: schema,
            graphiql: process.env.NODE_ENV === 'development'
        }))
    }
}

export default new App().express;