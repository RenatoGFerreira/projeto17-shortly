export function validateSchema(schema){
    return (req, res, next) =>{
        const user = req.body
        
        const validation = schema.validate(user, {abortEarly: false})
        if(validation.error){
            return res.status(409).send(validation.error.details.map(detail => detail.message))
        }
        next()
    }   
}