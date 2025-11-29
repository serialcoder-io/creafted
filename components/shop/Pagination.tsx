import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PaginationProps = {
    totalPages: number
    page: number
    selectedCategory: string
}

export default function Pagination({totalPages, page, selectedCategory}: PaginationProps) {
  return (
    <>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <ButtonGroup aria-label="Pagination">
            {/* Previous */}
            {page === 1 ? (
              <Button variant="outline" disabled>
                Previous
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href={`?category=${selectedCategory}&page=${page - 1}`}>
                  Previous
                </Link>
              </Button>
            )}

            <Button variant="outline" disabled>
              {page} / {totalPages}
            </Button>

            {/* Next */}
            {page === totalPages ? (
              <Button variant="outline" disabled>
                Next
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href={`?category=${selectedCategory}&page=${page + 1}`}>
                  Next
                </Link>
              </Button>
            )}
          </ButtonGroup>
        </div>
      )}
    </>
  );
}
