import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import { Product } from '@/utils/models/Product';

export async function GET(req, res) {
    await connect();

    const foundProducts = await Product.find({}).populate("user").sort({ createdAt: -1 });

    if (foundProducts) {
        return NextResponse.json(foundProducts);
    } else {
        return new NextResponse.json({
            error: "can't find products"
        }, { status: 404 })
    }
};

export async function POST(req, res) {
    await connect();

    const body = await req.json();
    const {
        name,
        description,
        images,
        brand,
        material,
        originalPrice,
        bracelet,
        price,
        condition,
        user,
        movment,
        thickness,
        glass,
        luminova,
        casematerial,
        crown,
        bandsize,
        lugs,
        water
    } = body;

    const newProduct = await Product.create({
        name,
        description,
        images,
        brand,
        material,
        originalPrice,
        bracelet,
        price,
        condition,
        user,
        movment,
        thickness,
        glass,
        luminova,
        casematerial,
        crown,
        bandsize,
        lugs,
        water
    });

    const savedProduct = await newProduct.save();
    return NextResponse.json({
        message: "Product created successfully",
        success: true,
        savedProduct
    })
};