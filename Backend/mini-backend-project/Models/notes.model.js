const mongoose  = require('mongoose');


require('mongoose-type-email');
 
const noteSchema = mongoose.Schema({
    title :{type:String, required:true},
    des : {type:String, required:true},
    userId : {type:String, required:true}
})

const NoteModel = mongoose.model("note" , noteSchema)


module.exports={NoteModel};