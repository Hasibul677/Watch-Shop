import connect from "@/utils/config/dbConnection";
import User from "@/utils/models/User";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        await connect();
        const { email, currentPassword, newPassword } = await request.json();

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }

        // Verify the current password
        const isMatch = await bcryptjs.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({
                error: "Current password is incorrect"
            }, { status: 400 });
        }

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

        // Update the user's password
        user.password = hashedNewPassword;
        await user.save();

        return NextResponse.json({
            message: "Password updated successfully",
            success: true
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}