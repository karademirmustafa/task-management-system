const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const createPages = () => {
    let pages = [];
    for (let i = 1; i <= Math.min(totalPages, 10); i++) { 
      pages.push(
        <li key={i}>
          {currentPage === i ? (
            <span
              className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-gray-500 border border-gray-300 ">
              {i}
            </span>
          ) : (
            <span  onClick={() => onPageChange(i)}
               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
              {i}
            </span>
          )}
        </li>
      );
    }
    return pages;
  };

  return (
    <nav className="p-4 flex bg-dark items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        {currentPage > 1 && (
          <li>
            <span onClick={() => onPageChange(currentPage - 1)}
               className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </span>
          </li>
        )}
        {createPages()}
        {currentPage < totalPages && (
          <li>
            <span onClick={() => onPageChange(currentPage + 1)}
               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
