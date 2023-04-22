const express = require('express');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UserModel } = require('../Models/user.model');
require('dotenv').config(); 

loginRouter.post('/', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) { res.status(422).json({
         error: "please fill all the entries" }) }
    else {
        let userData = await UserModel.findOne({ email });


        if (!userData) { res.status(404).json({ 
            error: "user doesnt exists, please register" }) }

        const val = await bcrypt.compare(password, userData.password);
        const token = jwt.sign({ userId: userData._id }, "masai");
        val ? res.status(200).json({
             msg: "login successfull", authToken: token }) : res.status(403).json({ msg: "wrong password" });

    }
    //__________________________________
 
});




module.exports = { loginRouter }