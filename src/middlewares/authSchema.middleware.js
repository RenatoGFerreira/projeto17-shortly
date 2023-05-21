import {db} from "../database/database.js"

export async function authValidation(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization?.replace("Bearer ", "")
  
    if (!token) return res.sendStatus(401)
  
    try {
      const { rows: sessions } = await db.query(`
        SELECT * FROM sessions WHERE token = $1
      `, [token])
  
      const [session] = sessions;
  
      if (!session) return res.sendStatus(401)
  
      const { rows } = await db.query(`
      SELECT * FROM users WHERE id = $1;
      `, [session.userId])
  
      if (!rows[0]) return res.sendStatus(401)

      const user = rows[0]
  
      res.locals.user = user
      next()
  
    } catch (err) {
      res.status(500).send(err.message)
    }
  
  }