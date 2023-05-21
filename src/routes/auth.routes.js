import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { signupSchema } from "../schemas/signupSchema.js"
import { signinSchema } from "../schemas/signinSchema.js"
import { getInfoUser, getRankingUsers, signIn, signUp } from "../controllers/auth.controllers.js"
import { authValidation } from "../middlewares/authSchema.middleware.js"
const authRouter = Router()

authRouter.post("/signup", validateSchema(signupSchema), signUp )
authRouter.post("/signin", validateSchema(signinSchema), signIn )
authRouter.get("/users/me", authValidation, getInfoUser);
authRouter.get("/ranking", getRankingUsers);

export default authRouter
