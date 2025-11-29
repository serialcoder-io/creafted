import ProductCard from "@/components/products/ProductCard";
import HeaderSection from "@/components/common/HeaderSection";
import Footer from "@/components/layout/Footer";
import prisma from "@/lib/prisma";
import CategoryFilter from "@/components/shop/CategoryFilter";
import Pagination from "@/components/shop/Pagination";

type SearchParams = Promise<{
  category?: string;
  page?: string;
}>;

type Props = {
  searchParams: SearchParams;
};

export default async function Shop({ searchParams }: Props) {
  const params = await searchParams;
  const { category } = params;
  const selectedCategory = category || "all";
  const page = Number(params.page) || 1;
  const limitPerPage = 9;

  const whereFilter =
    selectedCategory === "all"
      ? {}
      : {
          Category: {
            some: { slug: selectedCategory },
          },
        };

  const totalProducts = await prisma.product.count({
    where: whereFilter,
  });

  const totalPages = Math.ceil(totalProducts / limitPerPage);
  const skip = (page - 1) * limitPerPage;

  // Fetch paginated products
  const products = await prisma.product.findMany({
    where: whereFilter,
    orderBy: { created_at: "desc" },
    skip: skip,
    take: limitPerPage,
  });

  return (
    <>
      <HeaderSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral/90 mb-4">
            Shop All Products
          </h1>
          <p className="text-neutral/70">
            Discover our collection of handmade treasures
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <CategoryFilter searchParams={params} />

          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-neutral/70">
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
            {/* PAGINATION */}
            <Pagination
              totalPages={totalPages}
              page={page}
              selectedCategory={selectedCategory}
            />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
