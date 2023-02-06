const User = require('../model/user');
const bcrypt = require("bcrypt");
const { response } = require('express');

const register = async (req, res) => {
    // be sure that they provide email and password
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({sucess: false, message: "please provide neccessary information"});
    }
    // email hasnt been registered 
    const userExist =await User.findOne({email})
    if (userExist) {
        return res.status(400).json({ sucess:false, message: "Email already exists"});
    }
    // protect user info 
     const salt = await bcrypt.genSalt();
     const hashedPassword = await bcrypt.hash(password, salt);

    // create the user 
    try{
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).send({success: true,data: user});

    }catch(err){
        console.log(err);
        res.status(500).send({msg: "error"});

    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    // email and password
    if (!email || !password) {
        return res.status(401).json({sucess: false, message: "please provide neccessary information"});
    }
    // user has registered
    const user = await User.findOne({email})
    if (!user) {
        return res.status(401).json({sucess: false, message:"please Go and register"});
    }
    // provide the CORRECT detail, email and password
    const authenticated = user.email === email && (await bcrypt.compare(password, user.password));
    if (authenticated) {
        user.password = ""
        res.status(202).json({success: true, data:user});

    }else {
        return res.status(403).json({success:false, message: 'Invalid email or password'});
    }
}

module.exports = {register,login}