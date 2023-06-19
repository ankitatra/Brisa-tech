import React, { useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const Pagination = ({ issuesPerPage, totalIssues, currentPage, paginate,isClicked }) => {
  const totalPages = Math.ceil(totalIssues / issuesPerPage);
  console.log(isClicked)
 

  const buttonStyle = {
    backgroundColor: isClicked ? '#0969da' : '#656D76',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    margin:"10px"
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const nextpage = currentPage === 3 ? "next" : "notnext";
  const previouspage = currentPage === 1 ? "previous" : "notprevious";

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        
        <button  style={buttonStyle}
        onClick={() => paginate(i)}>
          {i}
        </button>
    
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <button
        disabled={currentPage == 1}
        className={previouspage}
        onClick={handlePrevPage}
      >
        <GrFormPrevious className={previouspage} /> Previous
      </button>

      {renderPageNumbers()}

      <button
        disabled={currentPage == 3}
        className={nextpage}
        onClick={handleNextPage}
      >
        Next <MdOutlineNavigateNext className={nextpage} />
      </button>
    </div>
  );
};

export default Pagination;
