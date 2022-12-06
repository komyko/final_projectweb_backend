const mongoose = require("mongoose")

const schema = mongoose.Schema ({
    name : String,
    detail : String,
    timestamp : Date,
   
    
});


module.exports = mongoose.model("post",schema)