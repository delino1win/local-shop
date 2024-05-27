import mongoose from "mongoose";
import 'dotenv/config';

const connectMongoDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Database Success, therefore is Connected");
    } catch (error) {
        console.error(error);
    }
}

export default connectMongoDataBase;