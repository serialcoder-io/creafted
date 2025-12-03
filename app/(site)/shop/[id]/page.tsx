// import HeaderSection from "@/components/common/HeaderSection";
import prisma from "@/lib/prisma";
// import Image from "next/image";

import ProductGallery from "@/components/shop/ProductGallery";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import HeaderSection from "@/components/common/HeaderSection";
import { Heart, ShoppingCart } from "lucide-react";
type Props = {
  params: Promise<{ id: string }>; // pour être sûr que TypeScript ne râle pas
};

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  console.log("id", id);

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

  const productImages = product?.images?.length
    ? product.images.map((img) => ({
        url: img.url,
        alt: img.alt,
        sortOrder: img.sortOrder,
      }))
    : [
        {
          url: product?.defaultImage || "/no_image_available.jpg",
          alt: product?.name || "No Image Available",
          sortOrder: 1,
        },
      ];

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-b from-rose-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <p className="text-xl text-foreground/80">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-primary/10 via-amber-50 to-orange-50">
      <HeaderSection />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 bg-background p-8 rounded-3xl shadow-lg">
          <ProductGallery images={productImages} />

          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-4xl font-bold text-foreground leading-tight">
                    {product.name}
                  </h1>
                </div>
              </div>

              <div className="">
                <div className="text-3xl text-green-700 font-semibold">
                  ${product.price?.toString() ?? "0.00"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 rounded-full px-3 py-1 text-sm font-normal">
                    In Stock ({product.stock} available)
                  </Badge>
                ) : (
                  <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30 rounded-full px-3 py-1 text-sm font-normal">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-4 py-3">
              <h2 className="text-2xl font-bold text-foreground/70">
                About This Piece
              </h2>
              <p className="text-foreground/60 leading-relaxed text-md">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <Button
                variant="outline"
                className={`w-full h-14 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-xl active:scale-98 }`}
              >
                <Heart className={`w-5 h-5 `} />
                <span>Add to Favorites</span>
              </Button>


              {product.stock > 0 ? (
                <Button className="w-full rounded-full h-14 shadow-lg hover:shadow-xl">
                  <ShoppingCart className={`w-5 h-5 `} />
                  Add to Cart
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button className="w-full rounded-full h-14 shadow-lg hover:shadow-xl">
                    Pre-Order Now
                  </Button>
                  <p className="text-sm text-center text-accent-foreground bg-accent rounded-full py-2 px-4">
                    Out of stock, but you can pre-order this product.
                  </p>
                </div>
              )}

              
            </div>

            <Separator className="bg-slate-200" />

            <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Meet the Artisan
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
