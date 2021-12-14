const productosModel = require("../models/productosModel")
module.exports={
    getAll:async function(req, res, next) {
        try{
          const productos = await productosModel.find().populate('')
          res.json(productos)
        }catch(e){
        }
      },
    getById:async function(req, res, next) {
        try{
            const producto = await productosModel.findById({_id:req.params.id}).select(
              {name: 1, price:1, code:1 ,description:1, category: 1, photo: 1})
            res.json(producto)  
        }catch(e){
          next(e)
        }
      },
    create: async function(req, res, next){
        try{
            const producto = new productosModel({
                name:req.body.name,
                price:req.body.price,
                description: req.body.description,
                code: req.body.code,
                category: req.body.category,
                photo: req.body.photo
            })

            const documento = await producto.save()
            res.json(documento)
        }catch(e){
          next(e)
        }
      },
    update: async function(req, res, next){
        try{
            const producto = await productosModel.updateOne({_id:req.params.id},req.body)
            res.json(producto)
        }catch(e){
          next(e)
        }
      },
    delete:async function(req, res, next){
        try{
            const producto = await productosModel.deleteOne({_id:req.params.id})
            res.json(producto)
        }catch(e){
          next(e)
        }
      }  
}