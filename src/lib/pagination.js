// lib/pagination.js

export const calculatePagination = (totalItems, itemsPerPage, currentPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Calculate start and end page numbers for pagination display
  let startPage = Math.max(1, currentPage - Math.floor(5 / 2));
  let endPage = Math.min(totalPages, startPage + 5 - 1);
  
  // Adjust if we're near the end
  if (endPage - startPage + 1 < 5) {
    startPage = Math.max(1, endPage - 5 + 1);
  }
  
  return {
    totalPages,
    startPage,
    endPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};

export const getPageItems = (items, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
};