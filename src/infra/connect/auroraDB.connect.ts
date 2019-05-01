import * as mysql from 'mysql';
import { dbConfigs } from '../configs/config';

class AuroraDBConnection {
    constructor() {
        //host, user, password, database
        /*this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;*/
    }

    public connect() {
        dbConfigs('auroradb').then( (res) => {
            var connection = mysql.createConnection({
                host: res.host,
                port: res.port,
                user: res.user,
                password: res.password,
                database: res.database
            });
            connection.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
            });
            global.mysql = connection;
        })
    }

}

export default new AuroraDBConnection();