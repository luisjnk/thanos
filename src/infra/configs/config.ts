import * as dbConfigPath from "./config.json"
import * as fs from 'fs'

export const dbConfigs = async (dbname) => {
    return new Promise(async function (resolve, reject) {
        const paths = dbConfigPath.development.databaseconfigs;
        const path = paths[dbname];
        let content;
        await fs.readFile(path, async function read(err, data) {
            if (err) {
                throw err;
            }
            content = data.toString('utf8')
            content = JSON.parse(content)
            resolve(content.development)
        });
    })
}