const express = require('express');
const noteRouter = express.Router();
const {auth}=require("../Middlewares/auth");
const { NoteModel } = require('../Models/notes.model');

//get
noteRouter.get('/',async (req,res)=>{
    let data = await NoteModel.find();
    res.send(data)
})

//post
noteRouter.post('/',auth,async(req,res)=>{
    try{
        let newNote = new NoteModel(req.body);
        await newNote.save();
        res.status(200).json({msg:"success", details:newNote})
    
    }catch(err){
        console.log("________________error:note :post");
        console.log(err)
    }
    



});

//delete 
noteRouter.delete('/:id',auth,async(req,res)=>{
    try{
       let mdata =await NoteModel.findById(req.params.id);
       if(!mdata){res.send("No such items exist")}
       let mongoUserId = mdata.userId;
       let authorsId = req.body.userId;
       if(mongoUserId==authorsId){
         await NoteModel.findByIdAndDelete(req.params.id);
        res.send("deleted succesffully")
       }
       else{
        res.send("you are not allowed ")
       }
   
    
    
    }catch(err){
        console.log("________________error:note :delete");
        console.log(err)
    }
    



});

module.exports={noteRouter}