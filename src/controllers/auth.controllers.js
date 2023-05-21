import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const isUserExist = await db.query(
      `
    SELECT * FROM users WHERE email =$1;
    `,
      [email]
    );
    
    if (isUserExist.rowCount > 0) return res.sendStatus(409);

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3);
    `, [name, email, passwordHash])

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body

  const { rows } = await db.query(`
    SELECT * FROM users WHERE email=$1
  `, [email]
  )

  if(!rows[0]) return res.sendStatus(401)


  if(bcrypt.compareSync(password, rows[0].password)) {
    const token = uuid()

    await db.query(`
      INSERT INTO sessions (token, "userId")
      VALUES ($1, $2)
    `, [token, rows[0].id])
    
    return res.send({token})
  }

  return res.sendStatus(401)
}
