import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "@/app/generated/prisma/browser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function productForClient(product: Product) {
  return {
    ...product,
    price: Number(product.price),
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at.toISOString(),
  };
}


