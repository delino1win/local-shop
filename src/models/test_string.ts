import mongoose, {Schema} from "mongoose";

const TestStringSchema = new Schema({
    stringFirst: String,
    stringSecond: String
})

const TestString = mongoose.models.TestString || mongoose.model("TestString", TestStringSchema);

export default TestString;