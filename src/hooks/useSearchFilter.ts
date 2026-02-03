import { useState } from "react";

export interface FilterConfig<T> {
  key: keyof T;
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
}
