const Pagination = ({ currentPage, totalPages, onPageChange, pageSize, totalItems }) => {
console.log(currentPage,totalPages,onPageChange,pageSize,totalItems)
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);
  const createPages = () => {
    let pages = [];
    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
      pages.push(
        <li key={i}>
          {currentPage === i ? (
            <span className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-white bg-gray-500 border border-gray-300 ">
              {i}
            </span>
          ) : (
            <span
              onClick={() => onPageChange(i)}
              className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
              {i}
            </span>
          )}
        </li>
      );
    }
    return pages;
  };

  return (
    <nav
      className="p-4 flex bg-dark items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500">
        Showing{' '}
        <span className="font-semibold text-gray-900">
          {' '}
          {startItem}-{endItem}{' '}
        </span>
        of <span className="font-semibold text-gray-900"> {totalItems}</span>
      </span>
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
