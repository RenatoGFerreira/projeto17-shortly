import joi from "joi"

export const signupSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email.required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required().ref("password")

})