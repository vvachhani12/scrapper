// require mongoose npm package
var mongoose = require('mongoose');

// saving Schema method from mongoose to a variable
var schema = mongoose.Schema;

// Creating an object that will validate all the data being stored in DB as per configuration
var articleSchema = new schema({

    // Title of the artilce is required and has to be unique
    title: {
        type: String,
        unique: true,
        required: true
    },

    // Article data is required and has to unique articleData
    link: {
        type: String,
        unique: true,
        required: true
    },

    // doing a Join with Note collection at the ID for each article
    note: {
        type: schema.Types.ObjectId,
        ref: "Note"
    },

    saved: {
        type: Boolean,
        default: false
    },

    // Saving the date in backend for when the article is scrapped.
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

// creating 'Articles' schema(collection) using model method of mongoose and saving to a variable
var Article = mongoose.model('Articles', articleSchema);

module.exports = Article;