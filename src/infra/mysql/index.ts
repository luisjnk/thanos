import * as mysql from 'mysql';

export const connect = () => {
    if(process.env.NODE_ENV == 'development') {
        var connection = mysql.createConnection({
            host: "127.0.0.1",
            port: "3307",
            user: "root",
            password: "password",
            database: "galactus"
        });

        connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
        });

        global.mysql = connection;
    }
}