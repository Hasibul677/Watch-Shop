import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import Order from '@/utils/models/Order';
import { Product } from '@/utils/models/Product';

export async function GET(req) {
    await connect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || 1);
    const limit = parseInt(searchParams.get("limit") || 5);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({
            error: "Failed to get email, email is required"
        }, { status: 400 })
    };

    const skip = (page - 1) * limit;

    try {
        const orders = await Order.find({ email }).populate({
            path: "cartProducts",
            model: Product,
        }).sort({ createdAt: -1 }).skip(skip).limit(limit);

        const totalOrders = await Order.countDocuments({ email });
        const hasMore = totalOrders > skip + orders.length;

        return NextResponse.json({
            orders,
            hasMore,
            totalOrders
        })

    } catch (error) {
        console.log("Error fetching order: ", error);
        return NextResponse.json({
            error: "Internal server error at api/order"
        }, { status: 500 })
    }
};


export async function PUT(req) {
    await connect();
    try {
        const { orderId } = await req.json();

        if (!orderId) {
            return NextResponse.json({
                error: "Order id is required"
            }, { status: 400 })
        };

        const updatedOrder = await Order.findByIdAndUpdate(orderId, {
            status: "delivered"
        }, { new: true }).populate({
            path: "cartProducts",
            model: Product,
        });

        if (!updatedOrder) {
            return NextResponse.json({
                error: "Order not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            message: "Order status updated to delivered",
            order: updatedOrder,
        })

    } catch (error) {
        console.log("Error fetching order: ", error);
        return NextResponse.json({
            error: "Internal server error at api/order"
        }, { status: 500 })
    }
}


