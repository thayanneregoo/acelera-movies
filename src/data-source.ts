import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/User"
import { Movie } from "./entity/Movie"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "acelera_movies",
    synchronize: false,
    logging: false,
    entities: [Users, Movie],
    migrations: [],
    subscribers: [],
})
export const getDBConnection = async (): Promise<DataSource> => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('inicializando data source')
    }
    return AppDataSource;
  };