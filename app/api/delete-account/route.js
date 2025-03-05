import User from "@/utils/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";

export async function DELETE() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?._id) {
            return NextResponse.json({ error: "Not authenticated or User ID missing" }, { status: 401 });
        }

        await connect();
        const deletedUser = await User.findByIdAndDelete(session.user._id);

        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Account deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting user account" }, { status: 500 });
    }
}
