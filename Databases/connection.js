const mongoose = require('mongoose'); 

const connect = async () => {
    try{
        const nameDb = 'mi_practica'; 
        await mongoose.connect('mongodb://localhost:27017/'+nameDb);

        console.log('Conectados exitosamente a la base de datos'); 
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    connect
}