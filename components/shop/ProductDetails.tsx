"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
type ProductForClient = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  defaultImage: string | null;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
  images?: {
    id: string;
    sortOrder: number;
    url: string;
    alt: string;
    productId: string;
    isDefault: boolean;
  }[];
};

export default function ProductDetails({ product }: { product: ProductForClient }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
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

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block mb-2 text-sm text-foreground/60">Quantity</label>
        <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-md">
          <Button
            variant="outline"
            className="rounded-full"
            size="icon-sm"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="min-w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            className="rounded-full"
            size="icon-sm"
            disabled={product.stock > 1 && quantity == product.stock}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <Button
          variant="outline"
          className={`w-full h-14 rounded-full`}
        >
          <Heart className={`w-8 h-8 `} />
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
  );
}
