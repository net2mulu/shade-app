import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({loading, pagination, setPagination, totalPages, refetch}) => {
  const handlePageClick = (event) => {
    const newPage = event.selected;
    const newOffset = newPage * pagination.perPage;

    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
      offset: newOffset,
    }));

    refetch({ limit: pagination.perPage, offset: newOffset });
  };

  const handleRowsPerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    setPagination({
      perPage: newPerPage,
      offset: 0,
      currentPage: 0,
    });

    refetch({ limit: newPerPage, offset: 0 });
  };



  return (
    <section className="flex justify-center items-center md:justify-end gap-10">
    {!loading && <div className="flex items-center gap-2">
        <label htmlFor="rowsPerPage" className="text-sm text-gray-700">
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={pagination.perPage}
          onChange={handleRowsPerPageChange}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          {[1,5, 10, 20, 50].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>}
        <ReactPaginate
          renderOnZeroPageCount={false}
          breakLabel="..."
          breakClassName="bg-inherit font-bold text-center border border-white rounded-md px-3 py-1"
          nextLabel=">"
          nextClassName="space-x-2 items-center flex text-[#3170B5] px-4 py-1 ml-2"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(
            totalPages /
              pagination.perPage
          )}
          previousLabel="<"
          previousClassName="space-x-2 items-center flex text-[#3170B5] px-4 py-1 mr-2"
          containerClassName=""
          className="flex justify-center text-[#3170B5] items-end md:justify-end mr-5"
          pageLinkClassName="px-3 py-1"
          pageClassName="bg-inherit py-1 rounded-md mx-1"
          activeLinkClassName="text-white bg-[#3170B5] w-full rounded-md px-1 text-[#3170B5]"
          activeClassName="text-[#3170B5] text-white"
        />
   </section>
  );
};

export default Pagination;
