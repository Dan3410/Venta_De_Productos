const userModel = require("../utils/models/userModel");

module.exports ={
    
    mailFormat:(input) => {
        console.log(input)
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(input);
    },
    mailAlreadyInDatabase:(input) => {
        userModel.findOne({ userName: req.body.userName }).then((user) =>{
            return userModel.findOne({ mail: input }) !== null;
        })
    }
}