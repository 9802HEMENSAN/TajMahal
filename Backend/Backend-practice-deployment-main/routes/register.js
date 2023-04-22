const express = require('express');
const { UserModel } = require('../Models/user.model');
const regRouter = express.Router();

regRouter.post('/', async (req, res) => {
    try {
        let { email } = req.body;
        let userExists = await UserModel.findOne({ email })
        if (userExists) { res.status(409).send({ 
            error: "user already exists , please login" }) }
        else {
            let newUser = new UserModel(req.body)
            await newUser.save()
            res.send(newUser)
        }
    }
    catch (err) {
        console.log("___________err : post : regRouter");
        console.log(err);
    }

});


module.exports = { regRouter }