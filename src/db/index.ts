import mongoose from "mongoose";
import config from "config";
import logger from "@src/logger";

const dbConnect = async (): Promise<void> => {
  const dbUrl = config.get("dbUrl") as string;
  return mongoose
    .connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      logger.info("Database connected 🤖🤖");
    })
    .catch(err => {
      logger.error(err);
    });
};

export default dbConnect;
