// app/shop/loading.tsx
import ProductCardSkeleton from "@/components/shop/ProductCardSkeleton";
import HeaderSection from "@/components/common/HeaderSection";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn/ui Skeleton
import CategoryFilterSkeleton from "@/components/shop/CategoryFilterSkeleton";

export default function ShopSkeleton() {
  return (
    <>
      <HeaderSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header texte */}
        <div className="mb-8">
          <Skeleton className="h-10 w-1/3 mb-4" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar CategoryFilter Skeleton */}
          <CategoryFilterSkeleton />

          <main className="flex-1">
            {/* Nombre de produits */}
            <div className="mb-6 flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
            </div>

            {/* Grille produits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
