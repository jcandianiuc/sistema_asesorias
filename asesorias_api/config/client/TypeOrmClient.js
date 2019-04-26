import {createConnection} from "typeorm";

const {basePath} = global;

const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: '',
    password: "test",
    database: "test",
    entities: [
        `${basePath}/src/infrastructure/*/*/**.js`
    ],
    synchronize: true
});

connection.connect();

module.exports = connection;