const mongoose=require("mongoose")

const jsonSchema = new mongoose.Schema({
    data: String,
    timestamp: { type: Date, default: Date.now },
});

const JsonData = mongoose.model('jsonData', jsonSchema);
module.exports={JsonData}