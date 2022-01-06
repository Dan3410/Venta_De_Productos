const mongoose = require("../bin/mongodb")

const productosSchema = new mongoose.Schema({
        name: String,
        price: String,
        photo: String,
        code: String,
        description: String,
        category: String,
        id:false
    }
)

productosSchema.set("toJSON",{getters:true,setters:true,virtuals:true})
module.exports = mongoose.model('Productos',productosSchema)