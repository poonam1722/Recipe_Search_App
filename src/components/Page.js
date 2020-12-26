import React from 'react';
import Paginate from 'react-bootstrap/Pagination';

const Page = ({
  paginate,
  currentPage,
  recipesPerPage,
  totalRecipes,
  
}) => {
  let pageNumbers = [];
  let activepage = currentPage;

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(
      <Paginate.Item key={i} active={i === activepage} onClick={() => paginate(i)}>
        {i}
      </Paginate.Item>
    );
  }

  return <Paginate>{pageNumbers}</Paginate>;
};

export default Page;
