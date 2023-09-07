import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
        },
        value: {
            type: Number,
            required : true,
        },
        feedBack: {
            type: String,
            required : true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("reviews",reviewSchema);