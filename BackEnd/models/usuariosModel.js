const mongoose = require("../bin/mongodb");
const bcrypt = require("bcrypt");
const mailValidators = require("../validators/mailValidator.js");


const usuariosSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "El campo firstName es obligatorio"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "El campo lastName es obligatorio"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "El campo userName es obligatorio"],
    unique: [true, "Ya existe un usuario con ese nombre"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "El campo password es obligatorio"],
    trim: true,
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    maxlength: [14, "La contraseña debe tener como máximo 14 caracteres"],
  },
  mail: {
    type: String,
    required: [true, "El campo mail es obligatorio"],
    unique: [true, "El mail ya esta registrado"],
    validator:function(value){
        return mailValidator.mailFormat(value)
    },
    message: "El mail esta mal formateado"
},
  accountType: {
    type: String,
    required: [true, "Falta el valor de accountType"],
  },
});
usuariosSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

usuariosSchema.set("toJSON", { getters: true, setters: true, virtuals: true });
module.exports = mongoose.model("Usuarios", usuariosSchema);
