const express = require('express'); 
const cors = require('cors'); 
const {connect} = require('./Databases/connection'); 

// Instancia de la creacion de la base de datos; 
connect(); 

// Instancia del gestor http;
const app = express(); 

// Habilitacion del cors
app.use(cors()) 

// Conversion del cuerpo de peticiones; 
app.use(express.json()); 

// RUTA DE PRUEBA; 
app.get('/',(req,res) =>{
    return res.status(200).json({
        title: 'Probando', 
        description: 'Probando mi primera API con NodeJS', 
    })
})

// RUTAS ESPECIFICAS; 
const router = require('./Router/article'); 

app.use('/api',router)

// Puerto de salida de la API; 
const port = 3900; 
app.listen(port,()=>{
    console.log('Iniciada la API'); 
})