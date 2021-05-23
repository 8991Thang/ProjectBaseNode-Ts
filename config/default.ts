import dotenv from "dotenv-safe"
dotenv.config()
export default {
    dbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uraig.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    saltWordLength: 10,
    secretKeyAccessToken: "secretKeyAccessToken",
    secretKeyRefreshToken: "secretKeyRefreshToken",
    expiredAccessToken: "1day",
    expiredRefreshToken: "7days"
}