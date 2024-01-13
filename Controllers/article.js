const { validateArticle } = require("../helpers/validate");
const Article = require("../Models/article");
const fs = require("fs");
const path = require("path");

const Prueba = (req, res) => {
  return res.status(200).json({
    message: "Creado con exito mi primer controlador",
  });
};

// Crear nuevos documentos en mi base de datos;
const newArticle = async (req, res) => {
  // Recoger los parametros de la request;
  const parameters = req.body;

  // Hacer validacion de campos;
  try {
    validateArticle(parameters);
  } catch (error) {
    return res.status(400).json({
      message: "Error, faltan datos",
    });
  }

  // Crear el modelo;
  const article = new Article(parameters);

  // Almacenamiento en la db;
  const sendArticle = await article.save();

  // Devolver un resultado;
  if (sendArticle) {
    return res.status(200).json({
      message: "Sucess",
      article,
    });
  } else {
    return res.status(400).json({
      message: "Fallo en la creacion del articulo",
    });
  }
};

// Obtener todos los datos de la coleccion;
const allArticles = async (req, res) => {
  // Posible limite;
  const limit = 10;

  // Obtener los datos;
  const articles = await Article.find({})
    .sort({ dates: -1 }) // En caso de querer ordenar:
    .limit(limit)
    .exec(); // Para ejecutar la consulta;

  // Generar una respuesta;
  if (articles) {
    return res.status(200).json({
      message: "Sucess",
      articles,
    });
  } else {
    return res.status(400).json({
      message: "No se encontraron articulos",
    });
  }
};

// Eliminar algun articulo;
const deleteArticle = async (req, res) => {
  // Obtener el id del articulo que se quiere eliminar;
  const id = req.params.idArticle;

  // Eliminar;
  const deleted = await Article.findOneAndDelete({ _id: id });

  // Devolver una respuesta;
  if (deleted) {
    return res.status(200).json({
      message: "Deleted",
      deleted,
    });
  } else {
    return res.status(400).json({
      message: "No fue posible eliminar el articulo",
    });
  }
};

// Actualizar el documento;
const updateArticle = async (req, res) => {
  // Recoger el id;
  const id = req.params.idArticle;

  // Recoger los parametros;
  const parameters = req.body;

  // Hacer validacion de campos;
  try {
    validateArticle(parameters);
  } catch (error) {
    return res.status(400).json({
      message: "Error, faltan datos",
    });
  }

  // Hacer la actualizacion;
  const updated = await Article.findOneAndUpdate({ _id: id }, parameters, {
    new: true,
  });

  // Devolver la repuesta;
  if (updated) {
    return res.status(200).json({
      message: "Sucess",
      updated,
    });
  } else {
    return res.status(400).json({
      message: "No fue posible modificar el articulo",
    });
  }
};

// Encontrar un solo articulo;
const articulo = async (req, res) => {
  // Recibir el id;
  const id = req.params.idArticle;

  // Encontrar el articulo;
  const find = await Article.findOne({ _id: id });

  // Generar la respuesta;
  if (find) {
    return res.status(200).json({
      message: "Sucess",
      find,
    });
  } else {
    return res.status(400).json({
      message: "No fue posible econtrar el articulo, o posiblemente no existe",
    });
  }
};

// Guardar una imagen;
const saveImage = async (req, res) => {
  // Recibir el id;
  const id = req.params.idArticle;

  // Validar la existencia del articulo;
  if (!req.file) {
    return res.status(400).json({
      status: "Error",
      message: "No se ha cargado ningun archivo",
    });
  }

  // Validar la extension del articulo;
  const file = req.file.originalname;
  const ext = file.split(".")[1];

  if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "gif") {
    fs.unlink(req.file.path, (error, exist) => {
      if (exist) {
        res.status(400).json({
          message: "Formato no permitido",
        });
      }
    });
  } else {
    // Actualizar el articulo correspondiente;
    const updatedA = await Article.findOneAndUpdate(
      { _id: id },
      { image: req.file.filename },
      { new: true }
    );

    // Devolver una respuesta;
    if (updatedA) {
      return res.status(200).json({
        message: "Sucess",
        updatedA,
      });
    } else {
      return res.status(400).json({
        message:
          "No fue posible econtrar el articulo, o posiblemente no existe",
      });
    }
  }
};

// Show Image;
const showImage = async (req, res) => {
  // Recibir el id;
  const id = req.params.idArticle;

  // Obtenemos el nombre del archivo;
  const article = await Article.findOne({ _id: id });

  // Buscamos el archivo
  const realPath = `./images/article/${article.image}`;
  fs.stat(realPath, (error, exist) => {
    if (!exist) {
      return res.status(404).json({
        status: "404",
        message: "No se pudo encontrar la imagen",
      });
    } else {
      // En caso de que exista, generamos la respuesta;
      return res.sendFile(path.resolve(realPath));
    }
  });
};

module.exports = {
  Prueba,
  newArticle,
  allArticles,
  deleteArticle,
  updateArticle,
  articulo,
  saveImage,
  showImage,
};
