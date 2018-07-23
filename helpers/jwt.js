import jwt from 'jsonwebtoken'
import config from '../config/env/index'


const secret = config.jwt.jwtSecret;

const validate = (req,res,next,test=null) => {
    console.log('this is a test ',test);
    let bearer = req.headers['authorization'];
    if(typeof bearer !== 'undefined'){
        let token = bearer.split(' ');
        jwt.verify(token[1], secret,(err,decoded)=>{
            if(!err) {
                req.user = decoded;
                next();
            }
            else
                res.status(403).send({error:'Unauthorized',message:'Invalid bearer token'});
        });

    } else {
        res.status(403).send({error:'Unauthorized',message:'Bearer token is required'});
    }
};

export default validate