//import { Product } from '@/generated/prisma/browser';

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button";
//interface AddToCartButtonProps {
  //product: Product;
//}


export default function AddToCartButton() {
  return (
    <Button variant="default" size="icon" >
      <ShoppingCart className="w-4 h-4" />
    </ Button>
  )
}
