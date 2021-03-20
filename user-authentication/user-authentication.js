const { Database } = require('../database');
const { JWTMiddleware } = require('../middlewares.js')
class UserAuthentication {
    static async authenticateUser(username, password){
        try{
            const countParams = {
                "query" : {username, password},
                "options" : {},
                "collection" : "userData"
            }
            const db = new Database();
            const count = await db.countDocuments(countParams);
            if (count === 1){
                console.log("Login Successful")
            }
            return count
        }catch(e){
            throw e;
        }
    }
}

module.exports = { UserAuthentication }


