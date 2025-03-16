import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import { Product } from '@/utils/models/Product';


export async function GET(req, res) {

    await connect();
    const { params } = res;
    const searchTerm = params?.search;

    function createFlexibleSearchRegex(searchTerm) {
        const escapedSearchTerm = searchTerm.replace(
            /[-\/\\^$*+?.()|[\]{}]/g,
            "\\$&"
        );

        const regexPatern = escapedSearchTerm.split("").join("\\s");
        return new RexExp(regexPatern, "i"); //case insensitive
    };

    const searchTermRegex = createFlexibleSearchRegex(searchTerm);
    const foundProducts = await Product.find({
        $or: [{ name: { $regex: searchTermRegex } }, { description: { $regex: searchTermRegex } }]
    }).populate("user").sort({ createdAt: -1 });

    if (foundProducts) {
        return NextResponse.json(foundProducts);
    } else {
        return NextResponse.json({
            error: "Can't find the searched product"
        }, { status: 404 });
    }

};