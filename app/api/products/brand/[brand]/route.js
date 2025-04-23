import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import { Product } from '@/utils/models/Product';

export async function GET(req, {params}) {
    await connect();

    const { brand } = params;

    try {
        function createFlexibleSearchPattern(input) {
            const stripped = input.replace(/\s+/g, "").toLowerCase();
            return stripped.split("").join("\\s*");
        }

        const flexiblePattern = createFlexibleSearchPattern(brand);
        const brandRegex = new RegExp(flexiblePattern, "i");

        const foundProducts = await Product.find({ brand: brandRegex }).populate("user").sort({ createdAt: -1 });

        if (foundProducts && foundProducts.length > 0) {
            return NextResponse.json(foundProducts);
        } else {
            return NextResponse.json(
                { error: "No products found for brand" },
                { status: 404 }
            );
        }

    } catch (error) {
        return NextResponse.json({
            error: "Error fetching brand products"
        }, { status: 500 });
    }
}
