const mongoose = require('mongoose')
const entryschema = new mongoose.Schema({
    entry:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model("Entries",entryschema)