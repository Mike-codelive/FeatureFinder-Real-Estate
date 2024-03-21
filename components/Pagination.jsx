const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return pageSize > totalItems ? null : (
    <section className="container mx-auto flex justify-center items-center mt-10">
      <button
        className={`ml-2 px-2 py-1 border border-gray-300 rounded ${
          page === 1 ? "disabled-class" : "bg-blue-500 text-white"
        }`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        className={`ml-2 px-2 py-1 border border-gray-300 rounded ${
          page === totalPages ? "disabled-class" : "bg-blue-500 text-white"
        }`}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};
export default Pagination;
