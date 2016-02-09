var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true

    },
    description: {
        type: String,
    }
});

//Get all Articles
var Category = module.exports = mongoose.model('Category', categorySchema);


module.exports.getCategories = function(callback){
    Category.find(callback);
}


//Get Article by Id
module.exports.getCategoryById = function(id, callback){
    Category.findById(id, callback);
}

//Get Category Articles
module.exports.getArticlesByCategory = function(category, callback){
    var query = {category: category};
    Category.find(query, callback);
}

//Add Category
module.exports.createCategory = function(newCategory, callback){
    newCategory.save(callback);
}
