import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import Order from '@/utils/models/Order';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import Review from '@/utils/models/Review';
import { Product } from '@/utils/models/Product';


export async function POST(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                canReview: false
            }, { status: 200 })
        };

        const { productId, rating, comment } = await req.json();

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return NextResponse.json({
                error: "invalid product id"
            }, { status: 400 })
        };

        const objectIdProductId = new mongoose.Types.ObjectId(productId);

        const hasPurchased = await Order.findOne({
            user: session.user._id,
            "cartProducts.product": objectIdProductId,
            status: "delivered",
            paid: true
        });

        if (!hasPurchased) {
            console.log("user has not purchased this")
            return NextResponse.json({
                canReview: false
            }, { status: 200 })
        };

        const exitstingReview = await Review.findOne({
            user: session.user._id,
            product: objectIdProductId
        });

        if (exitstingReview) {
            return NextResponse.json({
                error: "you have already reviewd this"
            }, { status: 400 })
        };

        const newReview = new Review({
            user: session.user._id,
            product: objectIdProductId,
            rating,
            comment
        });

        await newReview.save();

        const product = await Product.findById(objectIdProductId);

        if (!product) {
            return NextResponse.json({
                error: "Product not found"
            }, { status: 404 })
        };

        product.reviews.push(newReview._id);
        product.numReviews = product.reviews.length;
        const allReviews = await Review.find({ product: objectIdProductId });
        const avgRating = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;
        product.averageRating = avgRating;

        await product.save();

        return NextResponse.json({
            message: "Review added successfully"
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            error: "internal server error at the review api main route"
        }, { status: 500 })
    }
};


export async function PUT(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                canReview: false
            }, { status: 200 })
        };

        const { reviewId, rating, comment } = await req.json();

        const review = await Review.findOne({
            _id: reviewId,
            user: session.user._id,
        });

        if (!review) {
            return NextResponse.json({
                error: "failed to find review"
            }, { status: 404 })
        };

        review.rating = rating;
        review.comment = comment;

        await review.save();

        const product = await Product.findById(review.product);
        const allReviews = await Review.find({ product: review.product });
        const avgRating = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;
        product.averageRating = avgRating;

        await product.save();

        return NextResponse.json({
            message: "Review updated"
        }, { status: 200 })

    }
    catch (error) {
        return NextResponse.json({
            error: "internal server error at the review api main route"
        }, { status: 500 })
    }
}