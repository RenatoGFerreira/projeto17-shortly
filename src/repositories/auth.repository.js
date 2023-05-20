import { db } from "../database/database.js";

export async function getAuth(){
    const result = await db.query(`SELECT * FROM games`)

    return result
}