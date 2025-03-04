import mongoose from "mongoose";
import { Product } from "./Product";

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide customers name"]
    },
    email: {
        type: String,
        required: [true, "please provide customers email"],
    },
    city: {
        type: String,
        required: [true, "please provide customers city"],
    },
    postalCode: {
        type: String,
        required: [true, "please provide customers postal code"],
    },
    streetAddress: {
        type: String,
        required: [true, "please provide customers adress"],
    },
    country: {
        type: String,
        required: [true, "please provide customers country"],
    },
    paid: {
        type: Boolean,
        default: false
    },
    cartProducts: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        price: { type: String }
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: [
            "processing",
            "pending",
            "shipped",
            "delivered",
            "cancelled",
            "payment_failed"
        ],
        default: "pending"
    },
    total: {
        type: Number,
        required: [true, "Must have total number"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;