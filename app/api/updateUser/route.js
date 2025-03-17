import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import User from '@/utils/models/User';


export async function PUT(req) {
    try {
        await connect();

        const { email, name, newEmail } = await req.json();
        const updateduser = await User.findOneAndUpdate(
            {
                email
            },
            {
                name,
                email: newEmail
            },
            { new: true }
        );

        if (!updateduser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "user updated successfully", user: updateduser }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error at the update user route" }, { status: 500 });

    }
}