import { ArrowRight } from "lucide-react";
import ProductCard from "../products/ProductCard";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function FeatureProductSection() {
  const featuredProducts = await prisma.product.findMany({
    take: 6,
    orderBy: { created_at: "desc" },
  });
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        <Link href="/shop" className="text-primary/80 hover:text-primary hover:cursor-pointer font-medium flex items-center">
          View All
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
