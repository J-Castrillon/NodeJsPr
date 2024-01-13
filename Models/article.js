const {Schema, model} = require('mongoose'); 

const articleSchema = Schema({
    title: {
        type: String,
        required: true, 
    },
    content: {
        type: String,
        required: true, 
    },
    dates: {
        type: Date,
        default: Date.now(),
    },
    image: {
        type: String,
        default: 'default.png'
    }
}); 

module.exports = model('Article', articleSchema); 
// Ya con esto esta listo el modelo; 