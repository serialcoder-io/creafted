import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryFilterSkeleton() {
  return (
    <aside className="lg:w-64 shrink-0">
      <div className="bg-background rounded-lg shadow-md p-6 sticky top-24">
        {/* Titre Filters */}
        <Skeleton className="h-6 w-32 mb-6" />

        {/* Titre Categories */}
        <Skeleton className="h-4 w-24 mb-3" />

        {/* Liens catégories */}
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-8 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </aside>
  );
}
