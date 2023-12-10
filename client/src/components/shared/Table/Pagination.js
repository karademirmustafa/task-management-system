const Pagination = ({ currentPage, totalPages, onPageChange, pageSize, totalItems,onPageSizeChange }) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  const createPages = () => {
    let pages = [];
    let start = Math.max(currentPage - 4, 1);
    let end = Math.min(start + 9, totalPages);

    if (totalPages > 10 && currentPage > 6) {
      pages.push(
        <li key="1">
          <span onClick={() => onPageChange(1)} className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
            1
          </span>
        </li>
      );
      if (currentPage > 7) {
        pages.push(<li key="ellipsis1" className="px-3 h-8 leading-tight text-gray-500">...</li>);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <li key={i}>
          {currentPage === i ? (
            <span className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-white bg-gray-500 border border-gray-300">
              {i}
            </span>
          ) : (
            <span onClick={() => onPageChange(i)} className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              {i}
            </span>
          )}
        </li>
      );
    }

    if (totalPages > 10 && currentPage < totalPages - 5) {
      if (currentPage < totalPages - 6) {
        pages.push(<li key="ellipsis2" className="px-3 h-8 leading-tight text-gray-500">...</li>);
      }
      pages.push(
        <li key={totalPages}>
          <span onClick={() => onPageChange(totalPages)} className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
            {totalPages}
          </span>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav
      className="p-4 flex bg-dark items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation">
           <div className="flex items-center">
           <span className="text-sm font-normal text-gray-500">
        Showing{' '}
        <span className="font-semibold text-gray-900">
          {' '}
          {startItem}-{endItem}{' '}
        </span>
        of <span className="font-semibold text-gray-900"> {totalItems}</span>
      </span>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm mx-2"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {[1, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        {currentPage > 1 && (
          <li>
            <span
              onClick={() => onPageChange(currentPage - 1)}
              className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </span>
          </li>
        )}
        {createPages()}
        {currentPage < totalPages && (
          <li>
            <span
              onClick={() => onPageChange(currentPage + 1)}
              className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
