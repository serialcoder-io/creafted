import prisma from "@/lib/prisma";
import { Filter } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  searchParams: {
    category?: string;
  };
};

export default async function CategoryFilter({ searchParams }: Props) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  const params = await searchParams; // 🔹 unwrap le Promise
  const { category } = params;
  const selectedCategory = category || "all";

  return (
    <aside className="lg:w-64 shrink-0">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
        <div className="flex items-center justify-between mb-2 lg:mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h2>
        </div>
        <Accordion type="single" collapsible defaultValue="category-filter">
          <AccordionItem value="category-filter">
            <AccordionTrigger>
              <h3 className="text-sm font-semibold text-foreground/70 mb-3">
                Categories
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="custom-scrollbar space-y-2 max-h-72 overflow-y-scroll">
                {categories.map(({ id, name, slug }) => (
                  <Link
                    key={id}
                    href={`?category=${slug}`}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === slug
                        ? "bg-rose-500 text-white"
                        : "bg-gray-50 text-foreground/80 hover:bg-gray-100"
                    }`}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
