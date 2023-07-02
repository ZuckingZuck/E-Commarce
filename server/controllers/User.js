const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

const loginUser = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.status(200).json({email: user.email, name: user.name, surname: user.surname, token, message: "Giriş başarılı!"})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


const signupUser = async (req,res) => {
    const {
        name,
        surname,
        email,
        phone,
        password
    } = req.body;

    try {
        const user = await User.signup(name, surname, email, phone, password);
        const token = createToken(user._id)
        res.status(200).json({email, token, message: "Giriş başarılı!"})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}






module.exports = { loginUser, signupUser };

// exports.userLogin = (req,res) => {
    
//     const {
//         email,
//         password
//     } = req.body.user;

//     User.findOne({email: email}).then(async (user) => {
//         bcrypt.compare(password, user.password).then((response) => {
           
//               const token = jwt.sign({
//                 name: user.name,
//                 email: user.email
//               }, "secret123")

//               return res.json({user: token})
//         })
        
//     })
// }

