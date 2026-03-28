interface PaginationProps {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalItems, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <div className="d-flex align-items-center justify-content-between mt-4">
      <button
        className="btn btn-outline-secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>Page {currentPage} of {totalPages === 0 ? 1 : totalPages}</span>

      <button
        className="btn btn-outline-secondary"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
