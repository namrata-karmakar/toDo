const { checkSchema } = require('express-validator');

class SchemaMiddleware{
    static validate(schema){
        return checkSchema(schema);
    }
}

module.exports = { SchemaMiddleware }