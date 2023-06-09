import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import userRoutes from "./routes/user.routes.js"
import urlRouter from "./routes/url.routes.js"


const port = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())

app.use(userRoutes)
app.use(urlRouter)


app.listen(port, () => {
    console.log(`Server running in port ${port}.`)
})