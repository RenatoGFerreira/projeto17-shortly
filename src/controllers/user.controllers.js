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

export async function getInfoUser(req, res){
  const { user } = res.locals
  console.log(user)

  const urlsByUser = await db.query(`
    SELECT * FROM shortens WHERE "userId"=$1;
  `, [user.id])

  const shortenedUrls = urlsByUser.rows.map(obj => {
    return {
      id: obj.id ,
      shortUrl: obj.shortUrl , 
      url: obj.url ,
      visitCount: obj.viewsCount 
    }
  })

  const totViews = await db.query(`
    SELECT SUM(shortens."viewsCount") FROM shortens WHERE "userId"=$1;
  `, [user.id])


  console.log(+totViews.rows[0].sum)
  try{
    res.status(200).send({
      id: user.id,
      name: user.name,
      visitCount: +totViews.rows[0].sum || 0,
      shortenedUrls: shortenedUrls
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

export async function getRankingUsers(Req, res){

  const object = await db.query(`
        SELECT users.id, users.name, 
        COUNT(shortens.id) as "linksCount",
        COALESCE(SUM(shortens."viewsCount"),0) as "visitCount" 
        FROM users 
        LEFT JOIN shortens ON shortens."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" 
        DESC LIMIT 10;
    `)

  try{
    res.status(200).send(object.rows)
  }catch(err){
    res.status(500).send(err.message)
  }
}