import { createUser, userExist } from "../repositories/auth.repository.js";
import bcrypt from "bcrypt"

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = res.locals.user
  
  try {
    const isUserExist = await userExist(email)
    if(isUserExist){
      return res.sendStatus(409)
    }
    const passwordHash = bcrypt.hashSync(password, 10)
    const user = {name, email, password:passwordHash}
    await createUser(user)
    res.sendStatus(201)
    
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}
