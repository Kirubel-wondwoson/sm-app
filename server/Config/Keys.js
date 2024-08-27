import dotenv from "dotenv"
dotenv.config()
const keys = {
  mongoURI: process.env.MONGO_URI
}
export default keys