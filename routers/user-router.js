const { Router } = require("express")
const { Database } = require("../database");
const { validationResult } = require('express-validator');
const { SchemaMiddleware } = require('../validations/schema-middleware')
const { JWTMiddleware } = require('../middlewares')
const { SignUpSchema } = require("../validations/signup-schema-validations");
const { ToDoSchema } = require("../validations/todo-schema-validations");
const { UserAuthentication } = require("../user-authentication/user-authentication")

class UserRouter{
    static getRouter(){
        const router = Router();

        router.get('/', (req,res) => {
            const jwt = JWTMiddleware.createToken();
            res.send(jwt);
        })

        router.post('/signUp', 
        SchemaMiddleware.validate(SignUpSchema),
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

        router.post('/login', 
        async (req,res) => {
            let response = "", status = "";
            try{
                const username = req.body.username
                const password = req.body.password
                const checkCredentials = await UserAuthentication.authenticateUser(username, password)
                if (checkCredentials === 1){
                    response = JWTMiddleware.createToken()
                    status = 202
                }else{
                    response = "Invalid Credentials";
                    status = 401
                }
            }catch(e){
                console.error(`[ERROR] ${e.message}-${e.stack}`)
                response = e.message;
                status = 401
            }finally{
                res.status(status).send(response)
            }
        })

        router.post('/toDo',
        SchemaMiddleware.validate(ToDoSchema),
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