// components/Pagination.js
import React from "react";
// npm install로 react-bootstrap 설치 필요
import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="d-flex justify-content-center mt-4 pagination-dark">
      <BootstrapPagination>
        <BootstrapPagination.First
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        <BootstrapPagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {[...Array(totalPages)].map((_, index) => (
          <BootstrapPagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </BootstrapPagination.Item>
        ))}

        <BootstrapPagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <BootstrapPagination.Last
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;
