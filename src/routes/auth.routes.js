import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { signupSchema } from "../schemas/signupSchema.js"
import { signinSchema } from "../schemas/signinSchema.js"
const authRouter = Router()

authRouter.post("/signup", validateSchema(signupSchema) )
authRouter.post("signin", validateSchema(signinSchema) )

export default authRouter
