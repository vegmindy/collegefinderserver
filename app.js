require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();
const controllers = require('./controllers');
const validateSession = require('./middleware/validateSession');

app.use(express.json());
app.use(require('./middleware/headers'));


app.use('/user', controllers.userController);
app.use(require('./middleware/validateSession'));
app.use('/favorites', controllers.favoritesController); 
app.use('/accepted', controllers.acceptedController);
app.use('/schools', controllers.schoolsController)


db.authenticate()
    .then(() => db.sync()) // => {force: true}
    .then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
    })
    .catch((err) => {
        console.log("[Server: ] Server Crashed");
        console.log(err)
    })