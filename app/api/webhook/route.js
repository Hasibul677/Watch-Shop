import { NextResponse } from 'next/server';
import connect from '@/utils/config/dbConnection';
import Stripe from 'stripe';
import Order from '@/utils/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = new Stripe(process.env.STRIPE_WEBHOOK_SECRET);


export async function POST(req) {
    await connect();
    let event;

    try {
        const body = await req.json();
        const signature = req.headers.get("stripe-signature");

        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

        console.log("webhook event construckted successfully", signature)

    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error at the web hook route" },
            { status: 500 }
        );

    }

    // handle the event

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            await handleSuccessfulPayment(session);
            break;

        case "payment_intent.succeeded":
            const payment_intent = event.data.object;
            await handleSuccessfulPayment(payment_intent);
            break;

        default:
            console.log(`Unhandeled event type ${event.type}`);
    }

    return NextResponse.json({ recived: true }, { status: 200 })
}


async function handleSuccessfulPayment(paymentObject) {
    let orderId;

    if (paymentObject.object === "checkout.session") {
        orderId = paymentObject.metadata.orderId;
    } else if (paymentObject.object === "payment_intent") {
        orderId = paymentObject.metadata.orderId;
    }

    if (!orderId) {
        console.log("No order Id found")
        return;
    }
    try {
        const updateOrder = await Order.findByIdAndUpdate(orderId, {
            paid: true,
            status: "delivered"
        });

        if (!updateOrder) {
            console.log(`No order found with this id ${orderId}`)
            return;
        }
        console.log(`Order ${orderId} updated: paid = true, status: delivered`)
    } catch (error) {
        console.error(`Error updating order ${orderId}`, error)
    }
}