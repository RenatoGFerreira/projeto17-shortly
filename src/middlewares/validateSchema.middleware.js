export function validateSchema(schema){
    return (req, res, next) =>{
        const user = req.body
        
        const validation = schema.validate(user, {abortEarly: false})
        if(validation.error){
            return res.status(422).send(validation.error.details.map(detail => detail.message))
        }

        res.locals.user = user
        next()
    }   
}