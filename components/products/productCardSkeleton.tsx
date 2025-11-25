import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="relative overflow-hidden aspect-square">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4 rounded" /> {/* titre */}
        <Skeleton className="h-4 w-full rounded" />  {/* description ligne 1 */}
        <Skeleton className="h-4 w-5/6 rounded" />  {/* description ligne 2 */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <Skeleton className="h-3 w-12 rounded mb-1" /> {/* "As from" */}
            <Skeleton className="h-5 w-16 rounded" />    {/* prix */}
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16 rounded" /> {/* bouton View */}
            <Skeleton className="h-8 w-8 rounded-full" /> {/* bouton AddToCart */}
          </div>
        </div>
      </div>
    </div>
  );
}
