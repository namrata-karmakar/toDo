const { Router } = require("express")
const { Database } = require("../database");
const { validationResult } = require('express-validator');
const { SchemaMiddleware } = require('../validations/schema-middleware')
const {JWTMiddleware} = require('../middlewares')
const { Schema } = require("../validations/schema-validations");

class UserRouter{
    static getRouter(){
        const router = Router();

        router.get('/', (req,res) => {
            const jwt = JWTMiddleware.createToken();
            res.send(jwt);
        })

        router.post('/', 
        SchemaMiddleware.validate(Schema),
        async (req,res) => {
            const errors = validationResult(req);
            if (errors.isEmpty() === false) {
                return res.status(400).json({ errors: errors.array() });
            }else{
                let response = "", status = "";
                try{
                    const insertOneParams = {
                        "data": req.body,
                        "collection": "userData"
                    }
                    const db = new Database();
                    response = await db.insertOne(insertOneParams)
                    status = 201
                }catch(e){
                    console.error(`[ERROR] ${e.message}-${e.stack}`)
                    response = e.message;
                    status = 500
                }finally{
                    res.status(status).send(response)
                }
            }
        })
        return router;
    }
}

module.exports = {UserRouter}