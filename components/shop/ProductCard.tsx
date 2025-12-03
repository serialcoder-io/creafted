// import { ShoppingCart } from 'lucide-react';
// import { Product } from '@/types/index';
import Image from "next/image";
// import AddToCartButton from '../common/AddToCartButton';
import { Button } from "../ui/button";
import { Product } from "@/app/generated/prisma/browser";
import AddToCartButton from "../ui/custom/product/AddToCartButton";
import Link from "next/link";
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden aspect-square">
        <Image
          src={product.defaultImage || "/no_image_available.jpg"}
          alt={product.name}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          fill
        />

        {/**
         * {product.stock > 0 && product.stock <= 3 && !product.isPreOrder && (
          <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Only {product.stock} left
          </div>
        )}
         */}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-card-foreground/70 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-normal text-card-foreground">
              ${product.price?.toString() ?? "0.00"}
            </span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link
                href={`/shop/${product.id}`}
                className="px-4 py-2 border border-primary/70 text-primary/90 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium"
              >
                View
              </Link>
            </Button>
            {product.stock < 2 ? (
              <Button className="px-3 py-1 text-xs font-semibold" size="sm">
                Pre-Order
              </Button>
            ) : (
              <AddToCartButton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
