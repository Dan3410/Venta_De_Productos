var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017',function(error){
    if(error){
        throw error;
    }else{
        console.log('Conectado a MongoDB');
    }
})

module.exports = mongoose;