import { headers } from "next/headers";
import Stripe from "stripe";
import stripe from "../../../../server/stripe";
import db from "../../../../server/db";
import { mailer } from "../../../../server/mailer/mailer";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;
  try {
    if (!sig || !webhookSecret) {
      throw new Error("Missing Stripe signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.log(err);
    return new Response("Invalid stripe webhook request", { status: 400 });
  }

  const eventType = event.type;

  switch (eventType) {
    case "payment_intent.succeeded":
      const session = event.data.object;
      console.log(`Checkout session completed: ${session.id}`);

      await db.userPayment.create({
        data: {
          userId: session.metadata.userId,
          productId: session.metadata.product_id,
          amount: session.amount,
          transactionId: session.id,
        },
      });
      const userFromDb = await db.user.findUnique({
        where: {
          id: session.metadata.userId,
        },
      });

      console.log("Updated");
      await mailer.sendEmail({
        body: `Thank you for buying our products. Your transaction id is ${session.id}`,
        receiver: [userFromDb!.email!],
        subject: "Thank you for buying our products",
      });

    default:
      console.log(`Unhandled event type ${eventType}`);
      break;
  }

  return new Response("OK", { status: 200 });
}
