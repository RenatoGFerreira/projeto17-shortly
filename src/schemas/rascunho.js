export async function getUrlById(req, res) {
    const { id } = req.params
  
    try {
      const result = await db.query(`
      SELECT * FROM shortens WHERE id = $1
      `, [id])
  
      if (result.rowCount === 0) return res.sendStatus(404)
  
      const [url] = result.rows
  
      res.send({
        id: url.id,
        shortUrl: url.shortUrl,
        url: url.url
      })
  
    } catch (error) {
      console.log(error)
      res.status(500).send("Have a problem.")
    }
  
  }