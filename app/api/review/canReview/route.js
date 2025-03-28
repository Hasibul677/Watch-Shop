import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import Order from '@/utils/models/Order';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import Review from '@/utils/models/Review';


export async function GET(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                canReview: false
            }, { status: 200 })
        };

        const { searchParams } = new URL(req.url);

        const productId = searchParams.get("productId");

        if (!productId) {
            return NextResponse.json({
                error: "invalid product id"
            }, { status: 400 })
        };

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

        const hasReviewd = await Review.findOne({
            user: session.user._id,
            product: objectIdProductId
        });

        return NextResponse.json({
            canReview: !hasReviewd
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            error: "internal server error at the review api can route"
        }, { status: 500 })
    }
}