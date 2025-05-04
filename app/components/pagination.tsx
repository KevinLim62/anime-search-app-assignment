import { useSearchParams } from "react-router";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

const Pagination = ({ data }: { data: PaginationProps }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Get current page and per_page from URL or use defaults from data
  const currentPage = data.current_page;
  const perPage = data.items.per_page;

  // Calculate total pages
  const totalPages = data.last_visible_page;

  // Determine if previous/next buttons should be enabled
  const hasPrevious = currentPage > 1;
  const hasNext = data.has_next_page;

  // Create a function to navigate to a specific page
  const goToPage = (page: number, newPerPage?: number) => {
    const params = searchParams;
    params.set("page", page.toString());

    if (newPerPage) {
      params.set("limit", newPerPage.toString());
    }

    setSearchParams(params);
  };

  // Handle per page change
  const handlePerPageChange = (value: string) => {
    const newPerPage = Number.parseInt(value);
    // When changing items per page, we usually want to go back to page 1
    goToPage(1, newPerPage);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];

    // Always show current page
    // Try to show 2 pages before and after current page
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-end gap-1 mt-6">
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        disabled={!hasPrevious}
        onClick={() => goToPage(1)}
      >
        <ChevronsLeft /> First
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        disabled={!hasPrevious}
        onClick={() => goToPage(currentPage - 1)}
      >
        <ChevronLeft /> Previous
      </Button>

      <div className="flex items-center gap-1 mx-1">
        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className="w-8 h-8 p-0"
            onClick={() => goToPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        disabled={!hasNext}
        onClick={() => goToPage(currentPage + 1)}
      >
        <ChevronRight /> Next
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        disabled={!hasNext}
        onClick={() => goToPage(totalPages)}
      >
        <ChevronsRight /> Last
      </Button>

      <div className="flex items-center ml-2">
        <Select
          defaultValue={perPage.toString()}
          onValueChange={handlePerPageChange}
        >
          <SelectTrigger className="w-20 h-8">
            <SelectValue placeholder={perPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            {/* <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Pagination;
