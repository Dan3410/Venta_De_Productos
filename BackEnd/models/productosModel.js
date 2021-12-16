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

//correr este codigo solo una  vez, es para llenar la bd con 4 productos
/*var Productos = mongoose.model('Productos', productosSchema);


var productos1 = new Productos(
    {
        description : "Una silla común y corriente blanca",
        photo : "https://blogs.elpais.com/.a/6a00d8341bfb1653ef0163029959f8970d-pi",
        name : "Silla blanca",
        price : "199,99$",
        code : "052MQJKS12",
        category : "Sillas de colores"
    }
)

productos1.save(function(error, documento){
    if(error){
        console.log("error")
    }else{
        console.log(documento)
    }
})

var productos2 = new Productos(
    {
        description : "Una silla común y corriente negra",
        photo : "https://d2r9epyceweg5n.cloudfront.net/stores/340/925/products/silla-windsor-negra2-jpg1-fd5b0ec6d2ba67f32015155273607261-1024-1024.png",
        name : "Silla Negra",
        price : "199,99$",
        code : "193NWJE29E6",
        category : "Sillas de colores"
    }
)

productos2.save(function(error, documento){
    if(error){
        console.log("error")
    }else{
        console.log(documento)
    }
})

var productos3 = new Productos(
    {
        description : "Una silla de madera",
        photo : "https://sillasgamerxpro.com.mx/wp-content/uploads/2021/02/sillas-de-madera.jpg",
        name : "Silla de Madera",
        code : "123KJSD23",
        price : "239,99$",
        category : "Sillas de Madera"
    }
)

productos3.save(function(error, documento){
    if(error){
        console.log("error")
    }else{
        console.log(documento)
    }
})

var productos4 = new Productos(
    {
        name : "Silla con fórmulas Matemáticas",
        photo : "https://www.ohcielos.com/images/silla-escritorio-infantil-50059.jpg",
        description : "Una silla con fórmulas matemáticas, perfecto para los examenes virtuales de análisis (mientras no sea con cámara activada)",
        price : "399.9$",
        code : "093KIBN53",
        category : "Sillas especiales"
    }
)

productos4.save(function(error, documento){
    if(error){
        console.log("error")
    }else{
        console.log(documento)
    }
})
*/

productosSchema.set("toJSON",{getters:true,setters:true,virtuals:true})
module.exports = mongoose.model('Productos',productosSchema)
