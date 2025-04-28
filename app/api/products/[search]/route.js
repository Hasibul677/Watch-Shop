import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import { Product } from '@/utils/models/Product';

export async function GET(req) {
    await connect();
    const {searchParams} = new URL(req.url);
    const searchTerm = searchParams.get('search');
    console.log("searchTerm-11", searchTerm);

    if (!searchTerm) {
        return NextResponse.json(
            { error: "Search term is required" },
            { status: 400 }
        );
    }

    function createFlexibleSearchRegex(searchTerm) {
        const escapedSearchTerm = searchTerm.replace(
            /[-\/\\^$*+?.()|[\]{}]/g,
            "\\$&"
        );

        const regexPattern = escapedSearchTerm.split("").join("\\s*");
        return new RegExp(regexPattern, "i"); // case insensitive
    }

    const searchTermRegex = createFlexibleSearchRegex(searchTerm);
    
    try {
        const foundProducts = await Product.find({
            $or: [
                { name: { $regex: searchTermRegex } },
                { description: { $regex: searchTermRegex } }
            ]
        }).populate("user").sort({ createdAt: -1 });
        
        return NextResponse.json(foundProducts);
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({
            error: "Can't find the searched product"
        }, { status: 404 });
    }
}