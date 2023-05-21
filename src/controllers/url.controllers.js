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
