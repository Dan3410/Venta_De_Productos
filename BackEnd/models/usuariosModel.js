const mongoose = require("../bin/mongodb")
const bcrypt = require('bcrypt')
const validator = require("../validators/registerValidator")

const usuariosSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:[true, "El campo firstName es obligatorio"],
        trim: true
        },
    lastName: {
        type:String,
        required:[true, "El campo lastName es obligatorio"],
        trim: true
        },
    userName: {
        type:String,
        required:[true, "El campo userName es obligatorio"],
        unique: [true,"Ya existe un usuario con ese nombre"],
        trim: true
        },
    password: {
        type:String,
        required:[true, "El campo password es obligatorio"],
        trim: true,
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
        maxlength: [14, "La contraseña debe tener como máximo 14 caracteres"]
        },
    email: {
        type:String,
        required:[true, "El campo email es obligatorio"],
        unique: [true, "Ya existe un usuario con ese mail"],
        validate:{
            validator:function(value){
                return validator.emailValidate(value)
            },
            message: "Mail mal formateado"
        }
        },
    accountType: {
        type:String,
        required:[true, "Falta el valor de accountType"],
    }
    }
)
usuariosSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

usuariosSchema.set("toJSON",{getters:true,setters:true,virtuals:true})
module.exports = mongoose.model('Usuarios',usuariosSchema)
