"use server";

import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import db from "../../../server/db";
import stripe from "../../../server/stripe";

export async function buyProduct(formData: FormData) {
  const productId = formData.get("productId") as string;
  console.log(`Buying product with id ${productId}`);
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/register");
  }
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  const productFromDb = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  const PRICE_IN_USD = productFromDb!.price;
  const PRICE_IN_CENTS = PRICE_IN_USD * 100;

  const BASE_URL = process.env.BASE_URL!;

  const SUCCESS_REDIRECT = BASE_URL + "/purchases?success=true";
  const CANCEL_REDIRECT = BASE_URL + "/purchases?success=false";

  const checkoutSite = await stripe.checkout.sessions.create({
    success_url: SUCCESS_REDIRECT,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: PRICE_IN_CENTS,
          product_data: {
            name: productFromDb!.name,
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: {
        userId: user!.id,
        product_id: productFromDb!.id,
        price: PRICE_IN_USD,
      },
    },
    mode: "payment",
    //cancel_url: `${this.configService.get('FRONTEND_URL')}/cancel)}`,
    cancel_url: CANCEL_REDIRECT,
  });
  return redirect(checkoutSite.url!);
}
