import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { signupSchema } from "../schemas/signupSchema.js"
import { signinSchema } from "../schemas/signinSchema.js"
import { signIn, signUp } from "../controllers/auth.controllers.js"
const authRouter = Router()

authRouter.post("/signup", validateSchema(signupSchema), signUp )
authRouter.post("/signin", validateSchema(signinSchema), signIn )

export default authRouter
