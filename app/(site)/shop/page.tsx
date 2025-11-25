import ProductCard from "@/components/products/ProductCard";
import HeaderSection from "@/components/common/HeaderSection";
import Footer from "@/components/layout/Footer";
// import Link from "next/link";
import prisma from "@/lib/prisma";
import CategoryFilter from "@/components/shop/CategoryFilter";
// import { Product } from "@/generated/prisma/client";

type SearchParams = Promise<{
  category?: string;
}>;

type Props = {
  searchParams: SearchParams;
};

export default async function Shop({ searchParams }: Props) {
  const params = await searchParams; // 🔹 unwrap le Promise
  const { category } = params;
  const selectedCategory = category || "all";

  let products;

  if (selectedCategory === "all") {
    // Pas besoin d'include, on prend juste les produits
    products = await prisma.product.findMany({
      take: 9,
      orderBy: { created_at: "desc" },
    });
  } else {
    // On inclut Category pour filtrer par slug
    products = await prisma.product.findMany({
      take: 9,
      where: {
        Category: {
          some: {
            slug: selectedCategory,
          },
        },
      },
      include: {
        Category: { select: { slug: true } },
      },
      orderBy: { created_at: "desc" },
    });
  }

  return (
    <>
      <HeaderSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shop All Products
          </h1>
          <p className="text-gray-600">
            Discover our collection of handmade treasures
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <CategoryFilter searchParams={params} />

          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"} found
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground text-lg">
                  No products found in this category
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
