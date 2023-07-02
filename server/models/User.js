const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require("validator");
const AddressSchema = mongoose.Schema({
        il: String,
        ilce: String,
        mahalle: String,
        caddesokak: String,
        apartmanismi: String,
        binano: String,
        daireno: String,
  });
  

const User = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    emailVerification: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        min: 10,
        max: 10,
    },
    phoneVerification: {
        type: Boolean,
        default: false,
    },
    address: {
        type: AddressSchema,
        required: false
    },
    password: {
        type: String,
        required: true
    }
})

User.statics.login = async function(email, password) {
    if(!email || !password){
        throw Error("Bütün alanlar doldurulmak zorunda!");
    }

    const user = await this.findOne({email: email});
    
    if(!user){
        throw Error("Bu epostayla kayıtlı kullanıcı bulunamadı");
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error("Hatalı pardola!");
    }

    return user;
}

User.statics.signup = async function (name, surname, email, phone, password){


    if(!name || !surname || !email || !phone || !password){
        throw Error("Bütün alanlar doldurulmak zorunda!");
    }
    if(!validator.isEmail(email)){
        throw Error("Email uygun değil!");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Parola yeterince güçlü değil!");
    }

    const exists = await this.findOne({email: email});
    

    if(exists){
        throw Error("Eposta zaten kullanımda!");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({name, surname, email, phone, password: hash});
    return user;
} 


module.exports = mongoose.model("User", User);