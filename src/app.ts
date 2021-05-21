import dotenv from "dotenv-safe"
import log from "src/logger"
import express from "express"
dotenv.config()

const app = express();
const port = process.env.PORT || 8000

app.listen(port, () => {
    log.info(`App running on port ${port}`)
})