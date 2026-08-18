import mongoose from "mongoose";

const conncetDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully...")
    } catch (error) {
        console.error(error)
    }
}

export default conncetDB