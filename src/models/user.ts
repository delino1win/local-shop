import mongoose, {Schema} from "mongoose";

const userSchema = new Schema<User>({
    userId: {
        unique: true,
        required: true,
        type: String
    },  
    email: {
        type: String,
        required: true
    }, 
    userRole: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
}, {
    timestamps: true
})

const User : mongoose.Model<User> = mongoose.models.User || mongoose.model("User", userSchema);
export default User;