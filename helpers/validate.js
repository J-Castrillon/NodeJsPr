const validator = require("validator");

const validateArticle = (parameters) => {
  let validateTitle = !validator.isEmpty(parameters.title);
  let validateContent =
    !validator.isEmpty(parameters.content) &&
    validator.isLength(parameters.content, { min: 5, max: 50 });

    if(!validateTitle || !validateContent){
        throw new Error('Faltan datos por suministrar'); 
    }
};

module.exports = {validateArticle}
