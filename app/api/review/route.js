import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import Order from '@/utils/models/Order';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import Review from '@/utils/models/Review';
import { Product } from '@/utils/models/Product';

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Helper function to calculate average rating
const calculateAverageRating = async (productId) => {
    const allReviews = await Review.find({ product: productId });
    if (allReviews.length === 0) return 0;
    const totalRating = allReviews.reduce((acc, item) => acc + item.rating, 0);
    return totalRating / allReviews.length;
};

// Helper function to check if the user has purchased the product
const hasUserPurchasedProduct = async (userId, productId) => {
    return await Order.findOne({
        user: userId,
        "cartProducts.product": productId,
        status: "delivered",
        paid: true,
    });
};

// POST: Create a new review
export async function POST(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ canReview: false }, { status: 200 });
        }

        const { productId, rating, comment } = await req.json();

        if (!isValidObjectId(productId)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const objectIdProductId = new mongoose.Types.ObjectId(productId);

        // Check if the user has purchased the product
        const hasPurchased = await hasUserPurchasedProduct(session.user._id, objectIdProductId);
        if (!hasPurchased) {
            return NextResponse.json({ canReview: false }, { status: 200 });
        }

        // Check if the user has already reviewed the product
        const existingReview = await Review.findOne({
            user: session.user._id,
            product: objectIdProductId,
        });

        if (existingReview) {
            return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 });
        }

        // Create a new review
        const newReview = new Review({
            user: session.user._id,
            product: objectIdProductId,
            rating,
            comment,
        });

        await newReview.save();

        // Update the product's reviews and average rating
        const product = await Product.findById(objectIdProductId);
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        product.reviews.push(newReview._id);
        product.numReviews = product.reviews.length;
        product.averageRating = await calculateAverageRating(objectIdProductId);
        await product.save();

        return NextResponse.json({ message: "Review added successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error in POST /api/review:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT: Update an existing review
export async function PUT(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ canReview: false }, { status: 200 });
        }

        const { reviewId, rating, comment } = await req.json();

        // Find the review and ensure it belongs to the user
        const review = await Review.findOne({
            _id: reviewId,
            user: session.user._id,
        });

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        // Update the review
        review.rating = rating;
        review.comment = comment;
        await review.save();

        // Update the product's average rating
        const product = await Product.findById(review.product);
        product.averageRating = await calculateAverageRating(review.product);
        await product.save();

        return NextResponse.json({ message: "Review updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error in PUT /api/review:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// GET: Fetch reviews for a product
export async function GET(req) {
    try {
        await connect();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || 1);
        const limit = parseInt(searchParams.get("limit") || 5);
        const productId = searchParams.get("productId");

        if (!productId || !isValidObjectId(productId)) {
            return NextResponse.json({ error: "Valid productId is required" }, { status: 400 });
        }

        const skip = (page - 1) * limit;

        // Fetch reviews with pagination
        const reviews = await Review.find({ product: productId })
            .populate("user", "name profileImage")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Review.countDocuments({ product: productId });
        const hasMore = total > skip + reviews.length;

        return NextResponse.json({ reviews, hasMore }, { status: 200 });

    } catch (error) {
        console.error("Error in GET /api/review:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE: Delete a review
export async function DELETE(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ canReview: false }, { status: 200 });
        }

        const { reviewId } = await req.json();

        // Find the review and ensure it belongs to the user
        const review = await Review.findOne({
            _id: reviewId,
            user: session.user._id,
        });

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        const productId = review.product;

        // Delete the review
        await Review.deleteOne({ _id: reviewId });

        // Update the product's reviews and average rating
        const product = await Product.findById(productId);
        product.reviews = product.reviews.filter((r) => r.toString() !== reviewId);
        product.numReviews = product.reviews.length;
        product.averageRating = await calculateAverageRating(productId);
        await product.save();

        return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error in DELETE /api/review:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}