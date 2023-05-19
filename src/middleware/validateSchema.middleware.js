export function validateSchema(schema){
    const user = req.body
    return (req, res, next) =>{
        const validation = schema.validate(user, {abortEarly: false})
        if(validation.error){
            return res.status(409).send(validation.error.details.map(detail => detail.message))
        }
        next()
    }   
}