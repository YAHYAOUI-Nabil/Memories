const mongoose = require('mongoose')

const postMessageSchema = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    tags : [String],
    selectedFile : String,
    likeCount : {type:String, default:0},
    createdAt : {type:Date, default:new Date()}
})

module.exports = mongoose.model('PostMessage', postMessageSchema)