import { createConnection } from "typeorm";
import logger from "@src/logger";

const dbConnect = async (): Promise<void> => {
  createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: ["./src/entity/*.{ts,js}"],
    synchronize: true,
    extra: {
      insecureAuth: true,
    },
  })
    .then(() => {
      logger.info("DB Connected");
    })
    .catch(err => {
      logger.error(err, "err connect db");
    });
};

export default dbConnect;
