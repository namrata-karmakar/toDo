const {Database} = require('../database');
class StatusValidation {
    static getStatus(status){
        if(status != ("NOT STARTED" || "IN PROGRESS" || "DONE")){
            return ('Enter Valid Status');
        }
    }
}

module.exports = { StatusValidation }