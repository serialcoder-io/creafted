import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export default async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Fetch product from database
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Prepare product images
  const productImages = product.images.length
    ? product.images.map((img) => ({
        url: img.url,
        alt: img.alt,
        sortOrder: img.sortOrder,
      }))
    : [
        {
          url: product.defaultImage || "/no_image_available.jpg",
          alt: product.name || "No Image Available",
          sortOrder: 1,
        },
      ];

  // Return product with images
  return new Response(
    JSON.stringify({ product: { ...product, images: productImages } }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
