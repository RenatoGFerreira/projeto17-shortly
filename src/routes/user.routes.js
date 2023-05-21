import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { signupSchema } from "../schemas/signupSchema.js"
import { signinSchema } from "../schemas/signinSchema.js"
import { getInfoUser, getRankingUsers, signIn, signUp } from "../controllers/user.controllers.js"
import { authValidation } from "../middlewares/authSchema.middleware.js"
const userRouter = Router()

userRouter.post("/signup", validateSchema(signupSchema), signUp )
userRouter.post("/signin", validateSchema(signinSchema), signIn )
userRouter.get("/users/me", authValidation, getInfoUser);
userRouter.get("/ranking", getRankingUsers);

export default userRouter
