"use client";

import * as React from "react";
import { Check, PlusCircle } from "lucide-react";
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { DataTableColumn, FilterOption } from "./types";

export interface DataTableFacetedFilterProps {
  title?: string;
  options: FilterOption[];
  column?: DataTableColumn<any, any>;
  selectedValues?: string[] | Set<string>;
  onSelect?: (values: string[]) => void;
  singleSelect?: boolean;
}

export function DataTableFacetedFilter({
  title,
  options,
  column,
  selectedValues: controlledValues,
  onSelect,
  singleSelect = false,
}: DataTableFacetedFilterProps) {
  // Support both direct controlled values and TanStack column filter state
  const columnFilterValue = column?.getFilterValue();

  const selectedSet = React.useMemo(() => {
    if (controlledValues instanceof Set) {
      return controlledValues;
    }
    if (Array.isArray(controlledValues)) {
      return new Set(controlledValues);
    }
    if (Array.isArray(columnFilterValue)) {
      return new Set(columnFilterValue as string[]);
    }
    if (typeof columnFilterValue === "string" && columnFilterValue.length > 0) {
      return new Set([columnFilterValue]);
    }
    return new Set<string>();
  }, [controlledValues, columnFilterValue]);

  const handleSelectOption = (value: string) => {
    const nextSet = new Set(selectedSet);

    if (singleSelect) {
      if (nextSet.has(value)) {
        nextSet.clear();
      } else {
        nextSet.clear();
        nextSet.add(value);
      }
    } else {
      if (nextSet.has(value)) {
        nextSet.delete(value);
      } else {
        nextSet.add(value);
      }
    }

    const nextArray = Array.from(nextSet);

    if (onSelect) {
      onSelect(nextArray);
    }

    if (column) {
      column.setFilterValue(nextArray.length ? nextArray : undefined);
    }
  };

  const handleClearFilters = () => {
    if (onSelect) {
      onSelect([]);
    }
    if (column) {
      column.setFilterValue(undefined);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed text-xs font-medium"
        >
          <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
          {title}
          {selectedSet.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1.5 py-0 font-normal lg:hidden"
              >
                {selectedSet.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedSet.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1.5 py-0 font-normal"
                  >
                    {selectedSet.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedSet.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1.5 py-0 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedSet.has(option.value);
                const Icon = option.icon;

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelectOption(option.value)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    {Icon && (
                      <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="truncate">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs text-muted-foreground">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedSet.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearFilters}
                    className="justify-center text-center font-medium text-destructive cursor-pointer"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default DataTableFacetedFilter;
