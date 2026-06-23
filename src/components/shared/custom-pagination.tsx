"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { cn } from "@/lib/utils/tailwind-merge";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: CustomPaginationProps) {
  const getPageNumbers = () => {
    const pages: Array<number | string> = [];

    // If total pages is 5 or less, show all pages
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
      return pages;
    }

    // If current page is 1, 2, or 3: show 1 2 3 ... last
    if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
      return pages;
    }

    // If current page is last 3 pages: show 1 ... last-2 last-1 last
    if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      return pages;
    }

    // Current page is in the middle: show 1 ... current ... last
    pages.push(1, "...", currentPage, "...", totalPages);
    return pages;
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn("flex justify-center items-center gap-2.5", className)}
    >
      <button
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        aria-label="Go to first page"
        className={cn(
          "flex justify-center items-center p-2.5 border rounded-[8px] w-8 h-8 transition-colors",
          "border-[#F4F4F5] bg-white text-[#27272A]",
          "hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-zinc-800",
          "rtl:rotate-180"
        )}
      >
        <ChevronsLeft className="w-4 h-4 text-[#27272A]" />
      </button>

      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={cn(
          "flex justify-center items-center p-2.5 border rounded-[8px] w-8 h-8 transition-colors",
          "border-[#F4F4F5] bg-white text-[#27272A]",
          "hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-zinc-800",
          "rtl:rotate-180"
        )}
      >
        <ChevronLeft className="w-4 h-4 text-[#27272A]" />
      </button>

      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex justify-center items-center bg-white p-2.5 rounded-[8px] w-8 h-8 text-[#27272A]"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(+pageNumber)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex justify-center items-center p-2.5 border rounded-[8px] w-8 h-8 font-medium transition-colors",
              isActive
                ? "border-transparent bg-[#A6252A] text-white"
                : "border-[#F4F4F5] bg-white text-[#27272A] hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
            )}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={cn(
          "flex justify-center items-center p-2.5 border rounded-[8px] w-8 h-8 transition-colors",
          "border-[#F4F4F5] bg-white text-[#27272A]",
          "hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-zinc-800",
          "rtl:rotate-180"
        )}
      >
        <ChevronRight className="w-4 h-4 text-[#27272A]" />
      </button>

      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        aria-label="Go to last page"
        className={cn(
          "flex justify-center items-center p-2.5 border rounded-[8px] w-8 h-8 transition-colors",
          "border-[#F4F4F5] bg-white text-[#27272A]",
          "hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-zinc-800",
          "rtl:rotate-180"
        )}
      >
        <ChevronsRight className="w-4 h-4 text-[#27272A]" />
      </button>
    </nav>
  );
}
