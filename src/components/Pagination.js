import React from "react";

const styles = {
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  pagination: {
    listStyle: "none",
    padding: 0,
    display: "flex",
  },
  paginationItem: {
    margin: "0 5px",
  },
  paginationButton: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  paginationButtonHover: {
    backgroundColor: "#45a049",
  },
  activePage: {
    backgroundColor: "#45a049",
  },
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} style={styles.paginationItem} className={i === currentPage ? "active" : ""}>
          <button onClick={() => onPageChange(i)} style={styles.paginationButton}>{i}</button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div style={styles.paginationContainer}>
      {totalPages > 1 && (
        <ul style={styles.pagination}>
          {renderPagination()}
        </ul>
      )}
    </div>
  );
};

export default Pagination;
