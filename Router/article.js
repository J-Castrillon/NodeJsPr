const { Router } = require("express");
// Para lograr almacenar imagenes o archivos; 
const multer = require('multer'); 


// Importar el controller;
const {
  Prueba,
  newArticle,
  allArticles,
  deleteArticle,
  updateArticle,
  articulo,
  saveImage,
  showImage,
} = require("../Controllers/article");

const router = Router();

router.use("/api-prueba", Prueba);

// RUTAS ESPECIFICAS PARA EL CRUD;
// Save;
router.post("/article", newArticle);

// Find all Articles;
router.get("/allArticles", allArticles);

// Delete Articulo;
router.delete("/deleteArticle/:idArticle", deleteArticle);

// Update Article;
router.put("/updateArticle/:idArticle", updateArticle);

// Encontrar un solo articulo;
router.get("/unArticulo/:idArticle", articulo);

// Almacenar una imagen; 
const storageArticle = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './images/article')
    }, 
    filename: function(req,file,cb){
        cb(null, `article${Date.now()}${file.originalname}`)
    }, 
}); 

const subida = multer({storage: storageArticle}); 

router.post("/file/:idArticle",subida.single('file0'), saveImage); 

// Show Images; 
router.get("/showFile/:idArticle", showImage); 

module.exports = router;
