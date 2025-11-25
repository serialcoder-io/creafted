import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CategorySection() {
  const categories = await prisma.category.findMany({
    take: 3,
    where: {
      NOT : [
        {
          description: null
        }, 
        {
          name: "All"
        }
      ]
    },
    orderBy: { name: "desc" },
  });
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link href={`shop?category=${category.slug}`}
            key={category.id}
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 aspect-video"
          >
            <div className="absolute inset-0 bg-linear-to-br from-rose-500/80 to-orange-500/80 group-hover:from-rose-500/90 group-hover:to-orange-500/90 transition-all" />
            <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
              <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
              <p className="text-sm opacity-90">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
