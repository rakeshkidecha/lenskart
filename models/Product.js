const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const imagePath = '/uploads';

const ProductSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    frame_size : {
        type : Array,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    color : {
        type : Array,
        required : true
    },
    images : {
        type : Array,
        required : true
    },
    decsription : {
        type : String,
        required : true
    },
})

const imagesStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Math.random())
    }
})

ProductSchema.statics.uploadImagesFile = multer({storage:imagesStorage}).array('images',10);
ProductSchema.statics.imgPath = imagePath;

const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;