import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import { Product } from '@/utils/models/Product';

export async function GET() {
    await connect();

    try {
        const featuredProduct = await Product.findOne({ featured: true }).lean();

        if (!featuredProduct) {
            return NextResponse.json({
                error: "error finding featured product"
            }, { status: 404 })
        }

        return NextResponse.json(featuredProduct);
    } catch (error) {
        return NextResponse.json({
            error: "Failed to fetching featured product"
        }, { status: 500 })
    }
}