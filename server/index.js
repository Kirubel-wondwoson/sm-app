import express from "express"
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose"
import cors from "cors"
import dotenv from "dotenv" 
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import { error } from "console"


// CONFIGRATION
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

import UserRouter from "./Router/UserRouter.js"
import PostRouter from "./Router/PostRouter.js"


// FILE STORAGE
const storage =  multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/assets")
  },
  filename: (req, res, cb) => {
    cb(null, file.orginalname)
  }
})
const upload = multer({storage})

// connectDB()

app.use("user", UserRouter)
app.use("post", PostRouter)


const PORT = process.env.PORT || 4001
mongoose.connect(process.env.MONGO_URL)
.then (() => {
  app.listen(PORT, () => console.log(`Running on port ${PORT} 😍`))
})
.catch((error) => console.log( `${error} did not connect`))
