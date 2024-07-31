import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    return (
        <div className="pagination">
        <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
        >
            Previous</button>
            {[...Array(totalPages).keys()].map((pageNumber) => (
                <button
                    key={pageNumber + 1}
                    className={pageNumber + 1 === currentPage ? 'active' : ''}
                    onClick={() => handlePageClick(pageNumber + 1)}
                >
                    {pageNumber + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
