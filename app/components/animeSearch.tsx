import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "~/lib/hooks/use-debounce";

interface AnimeSearchProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

const AnimeSearchBar = ({
  defaultValue = "",
  placeholder = "",
  className = "",
}: AnimeSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the initial search query from URL or use default
  const initialQuery = searchParams.get("search") || defaultValue;
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Debounce the search query to prevent frequent updates
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Update the URL when the debounced search query changes
  useEffect(() => {
    const params = searchParams;

    // Update or remove the search query parameter
    if (debouncedSearchQuery) {
      params.set("search", debouncedSearchQuery);
    } else {
      params.delete("search");
    }

    // Reset to page 1 when search query changes
    params.set("page", "1");

    // Update the URL
    setSearchParams(params);
  }, [debouncedSearchQuery]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder={placeholder}
        className={`pl-10 w-full ${className}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default AnimeSearchBar;
