import { useDebouncedValue } from "@lilib/hooks";
import { useMemo, useState } from "react";
export interface FilterConfig<T> {
  key: keyof T; // string literal union of T's keys
  type: "text" | "select" | "range" | "boolean" | "date";
  label: string;
  options?: string[] | { label: string; value: any }[];
}

export interface SortConfig<T> {
  key: keyof T;
  direction: "asc" | "desc";
  type?: "string" | "number" | "date";
}

export function useSearchFilter<T extends Record<string, any>>(
  data: T[],
  searchKeys: (keyof T)[],
  filterConfigs: FilterConfig<T>[] = [],
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  const [debouncedQuery] = useDebouncedValue(searchQuery, 300);

  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (debouncedQuery) {
      result = result.filter((item) => {
        searchKeys.some((key) => {
          String(item[key] ?? "")
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase());
        });
      });
    }
    // Filters
    Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
      if (!filterValue) return;
      const config = filterConfigs.find((c) => String(c.key) === filterKey);
      if (!config) return;

      result = result.filter((item) => {
        const value = item[config.key];
        if (config.type === "select") return value === filterValue;
        if (config.type === "text")
          return String(value ?? "").includes(filterValue);
        return true;
      });
    });

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        return sortConfig.direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }
    return result;
  }, [
    data,
    debouncedQuery,
    activeFilters,
    searchKeys,
    filterConfigs,
    sortConfig,
  ]);
  return {
    filteredData,
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    sortConfig,
    setSortConfig,
  };
}
