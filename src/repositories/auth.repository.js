import { db } from "../database/database.js";

export async function userExist(email){
    const result = await db.query(
        `SELECT * FROM users WHERE email=$1;`,
        [email]
        )
        console.log(result)
    return result
}

export async function createUser(user){
    const {name, email, passwordHash} = user

    console.log(name)

    const result = await db.query(
        `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)`,
        [name, email, passwordHash]
    )

    return result
}