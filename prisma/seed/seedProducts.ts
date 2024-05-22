import { PrismaClient, Product } from "@prisma/client";

const db = new PrismaClient();

type ProductWithoutId = Omit<Product, "id">;

const PRODUCTS = [
  {
    name: "Product 1",
    description: "Description 1",
    price: 100,
  },
  {
    name: "Product 2",
    description: "Description 2",
    price: 200,
  },
  {
    name: "Product 3",
    description: "Description 3",
    price: 300,
  },
];

async function seedProducts() {
  for (const product of PRODUCTS) {
    const doesProductExist = await db.product.findFirst({
      where: {
        name: product.name,
      },
    });
    if (doesProductExist) {
      await db.product.update({
        where: {
          id: doesProductExist.id,
        },
        data: product,
      });
    } else {
      await db.product.create({
        data: product,
      });
    }
  }
  console.log("seed done");
}

seedProducts();
