import Joi from 'joi';

const validate = (schema) => {
    return(req, res, next) => {
        Joi.validate(req.body,schema,{abortEarly:false},(e) => {
            if(e === null){
                next()
            }else{
                // console.log(e.message);
                let details = e.details.map(d=>{
                    return {errors:d.message}
                });
                return res.status(500).json(details)
                // console.log(value)
            }
        })
}
};

export default validate