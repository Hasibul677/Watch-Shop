import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import { Product } from '@/utils/models/Product';

export async function GET(req) {
    await connect();

    try {
        const featuredProduct = await Product.findById({ featured: true });
        return NextResponse.json(featuredProduct)
    } catch (error) {
        return NextResponse.json({
            error: "Failed to fetching featured product"
        }, { status: 500 })
    }
};

export async function PUT(req, {params}) {

    await connect();
    const { productId } = params;

    try {
        const updatedFeaturedProducts = await Product.updateMany({ featured: true }, { featured: false });
        const updateProduct = Product.findByIdAndUpdate(productId, { featured: true }, { new: true })

        if (!updateProduct) {
            return NextResponse.json({
                error: "error finding featured product"
            }, { status: 404 })
        }

        return NextResponse.json(updateProduct)

    } catch (error) {
        return NextResponse.json({
            error: "Error updating product"
        }, { status: 500 })
    }
}