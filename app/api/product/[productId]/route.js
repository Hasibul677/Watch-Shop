import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import { Product } from '@/utils/models/Product';

export async function GET(req, {params}) {
    await connect();

    const { productId } = await params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({
                error: "Product not found"
            }, { status: 400 })
        };

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({
            error: "Failed to fetching product"
        }, { status: 500 })
    }
};

export async function PUT(req, context) {

    await connect();
    const { productId } = await context.params;
    const body = await req.json();


    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, body, { new: true, runValidators: true });

        if (!updatedProduct) {
            return NextResponse.json({
                error: "Product not found"
            }, { status: 404 })
        }

        return NextResponse.json(updatedProduct)

    } catch (error) {
        return NextResponse.json({
            error: "Error updating product"
        }, { status: 500 })
    }
}

export async function DELETE(req, context) {
    await connect();
    const { productId } = await context.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return NextResponse.json({
                error: "Product not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Product deleted successfully",
            deletedProduct
        });

    } catch (error) {
        return NextResponse.json({
            error: "Error deleting product"
        }, { status: 500 });
    }
}