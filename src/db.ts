import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "mysql-nataly.alwaysdata.net",
    port: 3306,
    username: "nataly",
    password: "Basededatospass",
    database: "nataly_raquira",
    entities: [
        "src/entity/*.ts"
    ],
    synchronize: true,
    logging: false,
})
