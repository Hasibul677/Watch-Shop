import mongoose from "mongoose";

const ProductShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    description: {
        type: String,
    },
    images: [{ type: String }],
    price: {
        type: Number,
    },
    originalPrice: {
        type: Number,
    },
    brand: {
        type: String,
    },
    material: {
        type: String,
    },
    bracelet: {
        type: String,
    },
    condition: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"

    }],
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    movement: {
        type: String,
        enum: [
            "Rolex 3235 Automatic Movement",
            "Rolex 3236 Automatic Movement",
            "Rolex 3237 Automatic Movement",
            "Patek Philipe 5677 Automatic Movement",
            "Patek Philipe 5678 Automatic Movement",
            "Audemars Piguet 8887 Automatic Movement",
            "Audemars Piguet 8888 Automatic Movement",
        ],
        default: "Rolex 3235 Automatic Movement"
    },
    thickness: {
        type: String,
        default: "12mm"
    },
    glass: {
        type: String,
        default: "Saphire Glass"
    },
    luminova: {
        type: String,
        default: "Yes"
    },
    casematerial: {
        type: String,
        enum: [
            "316L Stainless Steel",
            "904L Stainless Steel"
        ],
        default: "316L Stainless Steel"
    },
    crown: {
        type: String,
        default: "Screwed"
    },
    bandsize: {
        type: String,
        default: "14.5cm - 22.5cm adjustable"
    },
    lugs: {
        type: String,
        default: "20cm"
    },
    water: {
        type: String,
        default: "3 ATM"
    },
}, { timestamps: true });

ProductShema.methods.hasUserPurchased = async function (userId) {
    const Order = mongoose.model("Order");

    const order = await Order.findOne({
        user: userId,
        cartProducts: this._id,
        status: "delivered",
        paid: true
    });
    return !!order;
}

export const Product = mongoose.models.Product || mongoose.model("Product", ProductShema);
