import { db } from "../database/database.js";
import { nanoid } from "nanoid";

export async function postUrlShortens(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;
  const shortenUrl = nanoid(8);

  try {
    const { rows } = await db.query(`
    INSERT INTO shortens (url, "shortUrl", "userId") 
    VALUES ($1, $2, $3) RETURNING id;
    `,
      [url, shortenUrl, id]
    );
    res.status(201).send({ id: rows[0].id, shortUrl: shortenUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUrlById(req, res){
  const { id } = req.params

  const urlById = await db.query(`
      SELECT * FROM shortens WHERE id=$1;
    `, [id])

    if(urlById.rowCount === 0) return res.sendStatus(404)
    

  try{
    res.send({
      id: urlById.rows[0].id,
      shortUrl: urlById.rows[0].shortUrl,
      url: urlById.rows[0].url
    })

  }catch(err){
    res.status(500).send(err.message)
  }
}
