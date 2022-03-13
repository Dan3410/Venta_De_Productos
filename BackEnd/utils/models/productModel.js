const mongoose = require("../../bin/mongodb")

const productSchema = new mongoose.Schema({
        name: String,
        price: String,
        photo: String,
        code: String,
        description: String,
        category: String,
        id:false
    }
)

productSchema.set("toJSON",{getters:true,setters:true,virtuals:true})
module.exports = mongoose.model('Products',productSchema,"product")