import jwt from 'jsonwebtoken'
import config from '../config/env/index'


const secret = config.jwt.jwtSecret;

const validate = (req,res,next) => {
    let bearer = req.headers['authorization'];
    if(typeof bearer !== 'undefined'){
        let token = bearer.split(' ');
        jwt.verify(token[1], secret,(err,decoded)=>{
            if(!err) {
                req.user = decoded;
                next();
            }
            else
                res.status(331).send(err);
        });

    }else
        res.status(331).send({error:'missing jwt'});
};

export default validate