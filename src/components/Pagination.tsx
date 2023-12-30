// Pagination.tsx
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  visiblePages: number[];
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  visiblePages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="sticky top-28 md:top-14 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-center md:justify-start gap-2 items-center py-2">
        <Button
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </Button>
        {visiblePages.map((page) => (
          <Button
            size="sm"
            key={page}
            onClick={() => onPageChange(page)}
            variant={`${currentPage === page ? "ghost" : "secondary"}`}
          >
            {page}
          </Button>
        ))}
        <Button
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
