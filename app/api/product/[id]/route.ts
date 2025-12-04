import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const productImages =
    product.images.length > 0
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

  return NextResponse.json({
    product: { ...product, images: productImages },
  });
}
