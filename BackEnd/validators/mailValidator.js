const usuariosModel = require("../models/usuariosModel");

module.exports ={
    
    mailFormat:(input) => {
        console.log(input)
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(input);
    },
    mailAlreadyInDatabase:(input) => {
        usuariosModel.findOne({ userName: req.body.userName }).then((user) =>{
            return usuariosModel.findOne({ mail: input }) !== null;
        })
    }
}