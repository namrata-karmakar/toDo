const { INVALID_EMAIL_MESSAGE, INVALID_PASSWORD_MESSAGE } = require('./validation-messages.json')
const { AGE_ERROR_MESSAGE, TNC_ERROR_MESSAGE } = require('./validation-messages.json')
const { UniqueEmailValidation } = require('./unique-email-validation')
const { DOBValidation } = require('./dob-validation')

const SignUpSchema = {
    "username" : {
        "in": ["body"],
        "isEmail": true,
        "errorMessage": INVALID_EMAIL_MESSAGE,
        "normalizeEmail" : {
            "gmail_remove_dots" : false
        },
        "custom" : {
            "options" : username => {
                try{
                    UniqueEmailValidation.validateEmail(username);
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
        "custom" : {
            "options" : dob => {
                try {
                    new Date(dob) <= new Date(DOBValidation.getMinimumDOB())
                } catch (e) {
                    throw e
                }
            }
        },
        "errorMessage": AGE_ERROR_MESSAGE
    }
    // "tnc" : {
    //     "in" : ["body"],
    //     "isBoolean" : true,
    //     "custom" : {
    //         "options" : tnc => {
    //             try {
    //                 tnc === true
    //             } catch (e) {
    //                 throw e
    //             }
    //         }
    //     },
    //     "errorMessage": TNC_ERROR_MESSAGE
    // }
}

module.exports = { SignUpSchema };
