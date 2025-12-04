'use client'

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button";
import { ProductForClient as Product} from "@/types/products";
import { useCartStore } from "@/store/carteStore";

export default function AddToCartButton({product}: {product: Product}) {
  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.defaultImage || "/no_image_available.png",
    preorder: false,
  }

  const addItemToCart = useCartStore((state) => state.addItem);

  const onAddToCart = () => {
    addItemToCart(cartItem);
  }
  return (
    <Button variant="default" size="icon-sm" onClick={onAddToCart} >
      <ShoppingCart className="w-4 h-4" />
    </ Button>
  )
}
