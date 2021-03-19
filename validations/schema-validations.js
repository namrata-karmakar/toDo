const {INVALID_EMAIL_MESSAGE, INVALID_PASSWORD_MESSAGE} = require('./validation-messages.json')
const {AGE_ERROR_MESSAGE} = require('./validation-messages.json')
const {UniqueEmailValidation} = require('./unique-email-validation')
const {DOBValidation} = require('./dob-validation')
const Schema = {
    "username" : {
        "in": ["body"],
        "isEmail": true,
        "errorMessage": INVALID_EMAIL_MESSAGE,
        "normalizeEmail" : {
            "gmail_remove_dots" : false
        },
        "custom" : {
                "options" : async username => {
                    try{
                        await UniqueEmailValidation.validateEmail(username);
                    }catch(e){
                        throw e;
                    }
                }
            }
        },
    "password" : {
        "in": ["body"],
        "isStrongPassword": true,
        "errorMessage": INVALID_PASSWORD_MESSAGE        
    },
    "dob" : {
        "in" : ["body"],
        "isBefore" : "2003-03-19",
        "errorMessage": AGE_ERROR_MESSAGE,
    }
}

module.exports = {Schema};