const jsonwebtoken = require('jsonwebtoken');
const {config} = require('./config/config')

class JWTMiddleware{
    static createToken(){
        //console.log(config.get('secretString'));
        return jsonwebtoken.sign({}, config.get('secretString'), { expiresIn : '24h'});
    }
    static verifyToken(req,res,next){
        const jwt = req.headers.x_token;
        if (!jwt){
            return res.status(403).send({ message: "No token provided!" });
        }else{
            console.log(`JWT is : ${jwt}`)
            jsonwebtoken.verify(jwt, config.get('secretString'), (err, decoded) => {
                if(err){
                    res.status(403).send(err);
                }else{
                    next();
                }
            })
        }
    }
}

module.exports = {JWTMiddleware}