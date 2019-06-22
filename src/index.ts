import * as http from 'http';
import app from './app';
import { normalizePort, onError, onListening } from './utils/utils';
import * as mongoose from 'mongoose';
import { connect } from './infra/mysql/'

/*mongoose.connect('mongodb://localhost:27017/thanos')
mongoose.connection.once('open', () => {
    console.log('connected into database')
}*/
connect();
const server = http.createServer(app);
const port = normalizePort(process.env.port || 3001)
server.listen(port);
server.on('error', onError(server));
server.on('listening', onListening(server));