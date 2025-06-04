
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, ChevronDown, ChevronUp, Filter, Sliders } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { FilterCheckbox } from "@/components/FilterCheckbox";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  isExpanded?: boolean;
}

interface FilterSidebarProps {
  groups: {
    id: string;
    title: string;
    options: FilterOption[];
  }[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, values: string[]) => void;
  className?: string;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
  clearFilters?: () => void;
  searchValue?: string;
}

const FilterGroup = ({ title, options, selectedValues, onChange }: FilterGroupProps) => {
  const handleChange = (optionId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionId]);
    } else {
      onChange(selectedValues.filter((id) => id !== optionId));
    }
  };

  return (
    <div className="space-y-1">
      {options.map((option) => (
        <FilterCheckbox
          key={option.id}
          id={`filter-${option.id}`}
          label={option.label}
          count={option.count}
          checked={selectedValues.includes(option.id)}
          onChange={(checked) => handleChange(option.id, checked)}
        />
      ))}
    </div>
  );
};

export const FilterSidebar = ({
  groups,
  selectedFilters,
  onFilterChange,
  className,
  onSearch,
  searchPlaceholder,
  clearFilters,
  searchValue = "",
}: FilterSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { t } = useTranslation();

  // Update searchTerm when searchValue prop changes
  useEffect(() => {
    if (searchValue !== undefined) {
      setSearchTerm(searchValue);
    }
  }, [searchValue]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchTerm);
    }
  };

  const totalSelectedFilters = Object.values(selectedFilters).flat().length;

  return (
    <>
      {/* Mobile filters toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <span>{t("common.filter")}</span>
          </div>
          {totalSelectedFilters > 0 && (
            <Badge className="ml-2">{totalSelectedFilters}</Badge>
          )}
          {isMobileFiltersOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Search input */}
      {onSearch && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder || t("common.search")}
            className="pl-10 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={() => {
                setSearchTerm("");
                if (onSearch) onSearch("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Filters section */}
      <div
        className={cn(
          "space-y-6",
          isMobileFiltersOpen ? "block" : "hidden lg:block",
          className
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-base flex items-center">
            <Sliders className="mr-2 h-4 w-4" />
            {t("common.filters")}
          </h3>
          {clearFilters && totalSelectedFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={clearFilters}
            >
              {t("common.clearAll")}
            </Button>
          )}
        </div>

        <Accordion type="multiple" defaultValue={groups.map(g => g.id)} className="space-y-4">
          {groups.map((group) => (
            <AccordionItem
              key={group.id}
              value={group.id}
              className="border border-border rounded-lg px-2 overflow-hidden"
            >
              <AccordionTrigger className="py-3 px-2 hover:no-underline">
                <span className="font-medium text-sm">{t(group.title)}</span>
                {selectedFilters[group.id]?.length > 0 && (
                  <Badge className="ml-2" variant="secondary">
                    {selectedFilters[group.id].length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent className="pb-4 px-1">
                <FilterGroup
                  title={group.title}
                  options={group.options.map(option => ({
                    ...option,
                    label: t(option.label)
                  }))}
                  selectedValues={selectedFilters[group.id] || []}
                  onChange={(values) => onFilterChange(group.id, values)}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default FilterSidebar;
