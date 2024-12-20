const Product = require('../models/Product');
const fs = require('fs')
const path = require('path');

module.exports.home = async (req,res)=>{
    const allProduct = await Product.find();
    res.render('home',{allProduct});
}

module.exports.addProduct = (req,res)=>{
    res.render('addProduct');
}

module.exports.insertProduct = async (req,res)=>{

    var imagePath = [];

    if(req.files){
        imagePath = req.files.map((item)=>Product.imgPath+'/'+item.filename);
    }

    req.body.images = imagePath;

    await Product.create(req.body);
    return res.redirect('/');

}

module.exports.deleteProduct = async(req,res)=>{

    const singleProduct = await Product.findById(req.params.pId);

    singleProduct.images.map(async (item)=>{
        try {
            const deletePath = path.join(__dirname,'..',item);
            await fs.unlinkSync(deletePath);
        } catch (err) {
            console.log("Image not Found" , err)
        }
    })

    await Product.findByIdAndDelete(req.params.pId);
    return res.redirect('back');
}

module.exports.updateProduct = async (req,res)=>{
    const singleProduct = await Product.findById(req.params.pId);
    return res.render('editProduct',{singleProduct});
}

module.exports.editProduct = async (req,res) =>{

    const singleProduct = await Product.findById(req.body.pId);

    if(req.files.length != 0){
        singleProduct.images.map((item)=>{
            try {
                const deletePath = path.join(__dirname,'..',item);
                fs.unlinkSync(deletePath);
            } catch (err) {
                console.log("Image not found ",err);
            }
        })

        const newImagePath = req.files.map((item)=>Product.imgPath+'/'+item.filename);
        req.body.images = newImagePath;

    }else{
        req.body.images = singleProduct.images;
    }

    await Product.findByIdAndUpdate(req.body.pId,req.body);
    return res.redirect('/')

}