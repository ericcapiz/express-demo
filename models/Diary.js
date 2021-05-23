const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        required: true
    },
})

module.exports = mongoose.model("Diary", DiarySchema);