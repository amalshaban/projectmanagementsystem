// import React from "react";
type PaginationParams = {
    currentPage: number;
    totalNumberOfPages: number;
    requiredNumberOfPages: number;
  };
  
  export const paginate = ({
    currentPage,
    totalNumberOfPages,
    requiredNumberOfPages,
  }: PaginationParams) => {
    // 1. If the required number of pages is more than or equal to the total number of pages,
    //    return all available pages, because we can't show more pages than exist.
    // Example:
    //   totalNumberOfPages = 5, requiredNumberOfPages = 7
    //   We will return pages [1, 2, 3, 4, 5].
    if (requiredNumberOfPages >= totalNumberOfPages) {
      return range({ start: 1, end: totalNumberOfPages });
    }
  
    // 2. If there are enough pages available after the current page to display the required number of pages,
    //    show them starting from the current page.
    // Example:
    //   totalNumberOfPages = 10, currentPage = 4, requiredNumberOfPages = 3
    //   We can return pages [4, 5, 6] without any adjustments.
    if (currentPage + requiredNumberOfPages <= totalNumberOfPages) {
      return range({
        start: currentPage,
        end: currentPage + requiredNumberOfPages - 1,
      });
    }
  
    // 3. If we are close to the end of the total pages and showing the required number of pages would go
    //    beyond the total number of pages, adjust the starting page to ensure the correct number of pages
    //    is displayed without exceeding the total.
    // Example 1:
    //   totalNumberOfPages = 10, currentPage = 9, requiredNumberOfPages = 3
    //   If we try to display 3 pages starting from 9, we would go past 10 (9 + 3 = 12).
    //   We adjust the start to show pages [8, 9, 10].
    //
    // Example 2 (with fewer pages):
    //   totalNumberOfPages = 5, currentPage = 4, requiredNumberOfPages = 3
    //   Showing 3 pages starting from 4 would exceed the total number of pages (4 + 3 = 7, but we only have 5 pages).
    //   We adjust to return pages [3, 4, 5].
    if (currentPage + requiredNumberOfPages > totalNumberOfPages) {
      return range({
        start: Math.max(totalNumberOfPages - requiredNumberOfPages + 1, 1),
        end: totalNumberOfPages,
      });
    }
  
    // If none of the above conditions apply, return an empty array (though this case shouldn't normally happen).
    return [];
  };
  
  type RangeParams = {
    start?: number;
    end: number;
    step?: number;
  };
  
  export const range = ({ start, end, step = 1 }: RangeParams) => {
    const output = [];
  
    if (start) {
      for (let i = start; i <= end; i += step) {
        output.push(i);
      }
    }
  
    if (!start) {
      for (let i = 0; i <= end; i += step) {
        output.push(i);
      }
    }
  
    return output;
  };
  
  export default paginate;