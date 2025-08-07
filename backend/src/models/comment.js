import mongoose,{Schema} from 'mongoose';


const commentschema=new Schema({
    content:{
        type: String,
        unique:true,
    },
    userID:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        require:true,
    },
    postid:{
        type:mongoose.Types.ObjectId,
          ref:"user",
        require:true,
    },
    likes:{
        type:[mongoose.Types.ObjectId],
        ref:"user",
        default:[],
    },
   
},{timestamps: true})

const Comment=mongoose.model('Comment', commentschema);

export default Comment;