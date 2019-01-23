// require mongoose npm package
var mongoose = require('mongoose');

// saving Schema method from mongoose to a variable
var schema = mongoose.Schema;

// Creating an object that will validate all the data being stored in DB as per configuration
var noteSchema = new schema({

    title: {
        type: String,
    },

    body:{
        type: String
    },

    notesDate: {
        type: Date,
        default: Date.now
    }

});

// creating 'Notes' schema(collection) using model method of mongoose and saving to a variable
var Notes = mongoose.model('Note', noteSchema);

module.exports = Notes;

