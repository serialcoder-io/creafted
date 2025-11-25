//import { Product } from '@/generated/prisma/browser';

import { ShoppingCart } from "lucide-react"
//interface AddToCartButtonProps {
  //product: Product;
//}


export default function AddToCartButton() {
  return (
    <button // Zustand / Context / whatever
      className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center space-x-1 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
    >
      <ShoppingCart className="w-4 h-4" />
    </button>
  )
}
