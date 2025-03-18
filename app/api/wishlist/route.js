import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import User from '@/utils/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { Product } from '@/utils/models/Product';


export async function GET(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "user not found or not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || 1);
        const limit = parseInt(searchParams.get("limit") || 12);

        const skip = (page - 1) * limit;

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({
                error: "user not found"
            }, { status: 404 });
        }

        const totalItems = user.wishlist.length;
        const paginatedWishListIds = user.wishlist.slice(skip, skip + limit)
        const wishlistItems = await Product.find({
            _id: { $in: paginatedWishListIds }
        });

        return NextResponse.json({
            items: wishlistItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            hasMore: skip + limit < totalItems
        });


    } catch (error) {
        return NextResponse.json({
            error: "Internal server error at the wishlist route"
        }, { status: 500 });

    }
};

export async function PUT(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                error: "user not found or not authenticated"
            }, { status: 401 });
        }

        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({
                error: "Product not found"
            }, { status: 404 });
        };

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({
                error: "user not found"
            }, { status: 404 });
        };

        const product = await Product.findById(productId)
        if (!product) {
            return NextResponse.json({
                error: "product not found"
            }, { status: 404 });
        };

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        return NextResponse.json({
            message: "Product has been wishlisted"
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            error: "Internal server error at the wishlist update route"
        }, { status: 500 });

    }
};

export async function DELETE(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                error: "user not found or not authenticated"
            }, { status: 401 });
        }

        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({
                error: "Product not found"
            }, { status: 404 });
        };

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({
                error: "user not found"
            }, { status: 404 });
        };

        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId)
        await user.save();

        return NextResponse.json({
            message: "Product removed form wishlist"
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            error: "Internal server error at the wishlist delete route"
        }, { status: 500 });

    }
};

