const { INVALID_TODO_MESSAGE, INVALID_STATUS_MESSAGE } = require('./validation-messages.json')
const { StatusValidation } = require('./status-validation')

const ToDoSchema = {
    "todo" : {
        "in" : ["body"],
        "isLength" : {
            "options" : {min:1, max: 1000}
        },
        "errorMessage": INVALID_TODO_MESSAGE,
    },
    "status" : {
        "custom" : {
            "options" : status => {
                try {
                    StatusValidation.getStatus(status);
                } catch (e) {
                    throw e
                }
            }
        },
        "errorMessage": INVALID_STATUS_MESSAGE
    }
}

module.exports = { ToDoSchema };
