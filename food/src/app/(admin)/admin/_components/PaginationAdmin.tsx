import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationAdminProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationAdmin({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationAdminProps) {
  // Generate array of page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Handle different pagination display scenarios
    if (totalPages <= 2) {
      // If 2 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Add ellipsis if necessary
      if (currentPage > 3) {
        pageNumbers.push("ellipsis1");
      }

      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          // Avoid duplicating first and last page
          pageNumbers.push(i);
        }
      }

      // Add ellipsis if necessary
      if (currentPage < totalPages - 2) {
        pageNumbers.push("ellipsis2");
      }

      // Always include last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "ellipsis1" || pageNumber === "ellipsis2" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${pageNumber}`}>
              <PaginationLink
                href="#"
                isActive={currentPage === pageNumber}
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof pageNumber === "number") {
                    onPageChange(pageNumber);
                  }
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
