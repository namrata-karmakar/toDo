const {Database} = require('../database');
class UniqueEmailValidation {
    static async validateEmail(username){
        try{
            const countParams = {
                "query" : {username},
                "options" : {},
                "collection" : "userData"
            }
            const db = new Database();
            const count = await db.countDocuments(countParams);
            if (count > 0){
                throw new Error('Email exists');
            }
        }catch(e){
            throw e;
        }
    }
}

module.exports = {UniqueEmailValidation}