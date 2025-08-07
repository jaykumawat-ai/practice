import mongoose from 'mongoose'
console.log(process.env.MONGODB_URL);


const DB_Name = "mern-blog";
const connection = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
        console.log("mongodb connected successfully");

    } catch (error) {
        console.log("mongodb error", error);

    }
}

export default connection;