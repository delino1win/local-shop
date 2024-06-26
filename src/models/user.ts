import mongoose, {Schema} from "mongoose";

const userSchema = new Schema<User>({
    userId: {
        unique: true,
        required: true,
        type: String
    }, 
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
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
    address: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    balanceAmount: {
        type: Number,
        required: true
    },
    password: {
        type: String,
    }
}, {
    timestamps: true
})

const User : mongoose.Model<User> = mongoose.models.User || mongoose.model("User", userSchema);
export default User;