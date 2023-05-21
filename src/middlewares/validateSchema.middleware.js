export function validateSchema(schema){
    return (req, res, next) =>{
        const object = req.body
        const validation = schema.validate(object, {abortEarly: false})
        if(validation.error){
            return res.status(422).send(validation.error.details.map(detail => detail.message))
        }

        next()
    }   
}