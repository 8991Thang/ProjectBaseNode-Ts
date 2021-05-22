import dotenv from "dotenv-safe"
dotenv.config()
export default {
    dbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uraig.mongodb.net/test?retryWrites=true&w=majority`,
    saltWordLength: 10,
    secretKeyAccessToken: "secretKeyAccessToken",
    secretKeyRefreshToken: "secretKeyRefreshToken",
    expiedAccessToken: "1days",
    expiedRefreshToken: "7days"
}