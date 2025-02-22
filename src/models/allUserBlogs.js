import mongoose from "mongoose"
const allUserBlogSchema = mongoose.Schema({
    title:{type:String,required:true},
    category:{type:String,required:true},
    authorName:{type:String,required:true},
    
})