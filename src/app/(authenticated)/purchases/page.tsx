import { auth } from "../../../../auth";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "../../../server/db";

async function page() {
  const session = await auth();
  const usersPurchases = await db.userPayment.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      product: true,
    },
  });
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {usersPurchases?.map((purchase) => (
        <Card key={purchase.id} className="w-[300px]">
          <CardHeader>
            <CardTitle>{purchase.product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Bought at: {new Date(purchase.createdAt).toLocaleDateString()}
              for ${purchase.product.price}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default page;
