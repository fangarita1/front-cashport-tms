import UiSearchInput from "@/components/ui/search-input/search-input";
import { useDebounce } from "@/hooks/useSearch";
import React, { useState, useCallback, useMemo, useEffect } from "react";

interface OptimizedSearchComponentProps {
  onSearch: (query: string) => void;
  title?: string;
}

const OptimizedSearchComponent: React.FC<OptimizedSearchComponentProps> = ({ onSearch, title }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  return <UiSearchInput placeholder={title ? title : "Buscar cliente"} onChange={handleSearch} />;
};

export default OptimizedSearchComponent;
