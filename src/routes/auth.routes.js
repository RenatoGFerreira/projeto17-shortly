import { Router } from "express"
import { validateSchema } from "../middleware/validateSchema.middleware"
import { signupSchema } from "../schemas/signupSchema"

const authRouter = Router()

authRouter.post("/signup", validateSchema(signupSchema) )
authRouter.post("signin")

export default authRouter
