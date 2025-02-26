import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your full name"]
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
        unique: true
    },
    password: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/6388/6388307.png"
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    notificaionPreferances: {
        orderUpdates: { type: Boolean, default: true },
        promotions: { type: Boolean, default: false }
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;