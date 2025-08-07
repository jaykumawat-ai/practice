import mongoose,{Schema} from 'mongoose';


const userschema=new Schema({
    userName:{
        type: String,
        unique:true,
        require:true,
    },
    email:{
        type: String,
        require:true,
        unique:true,
    },
    password:{
        type: String,

        require:true,
    },
    userImage:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1fYaY9LEjaK0yhT3WsncM36y6MD9sLCHU4A&s",
    }
},{timestamps: true})

const user=mongoose.model('User', userschema);

export default user;