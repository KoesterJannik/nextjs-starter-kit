import React from "react";
import db from "../../../server/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buyProduct } from "./action";

type Props = {};

async function page({}: Props) {
  const shopItems = await db.product.findMany();
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {shopItems.map((item) => (
        <form key={item.id} action={buyProduct}>
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
              <p className="text-lg font-bold">${item.price}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
          <input type="hidden" name="productId" value={item.id} />
        </form>
      ))}
    </div>
  );
}

export default page;
