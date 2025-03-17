import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import User from '@/utils/models/User';


export async function POST(req) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ canReview: false }, { status: 200 });
        }

        const body = await req.json();

        const user = await User.findOneAndUpdate(
            {
                email: session.user.email
            },
            {
                $set: {
                    "notificaionPreferances.orderUpdates": orderUpdates,
                    "notificaionPreferances.promotions": promotions
                }
            },
            {
                new: true
            }
        );

        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 404 });

        }

        return NextResponse.json({
            message: "preferences updated successfully",
            preferences: user.notificaionPreferances,
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error at the update preferences route" }, { status: 500 });
    }
}