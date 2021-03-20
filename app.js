const express = require('express');
const { config } = require('./config/config');
const {JWTMiddleware} = require('./middlewares')
const { UserRouter } = require('./routers/user-router');
const app = express();
app.listen(config.get('port'), ()=>console.log(`listening at port ${config.get('port')}`));
app.use(express.json());

app.all('/api/*', JWTMiddleware.verifyToken)
app.use('/api', UserRouter.getRouter())
app.use('/user', UserRouter.getRouter())