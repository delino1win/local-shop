import mongoose, {Schema} from "mongoose";

type RefreshToken = {
    userId: Number;
    token: String;
    isUsed: Boolean;
    createdAt: Date;
    expiresAt: Date;
}

const refreshTokenTime = 30 * 3600 * 24;

const tokenSchema = new Schema<RefreshToken> ({
    userId: {
        type: Number,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
      isUsed: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: () => new Date(),
      },
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + refreshTokenTime * 1000),
      },
})

const Token = mongoose.models.token || mongoose.model("Token", tokenSchema);

export default Token;