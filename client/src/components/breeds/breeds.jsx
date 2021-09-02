import Breed from "../breed/Breed";
import React, { useState, useEffect } from "react";
import { getBreeds } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";;

export default function Breeds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [pageNumberLimit, setPageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const breedsState = useSelector((state) => state.breeds);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

 
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id))
  };

  const pages= [];
  for (let i = 1; i<= Math.ceil(breedsState.length / itemsPerPage); i++){
    pages.push(i)
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = breedsState.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if(number < maxPageNumberLimit +1 && number > minPageNumberLimit){
      return (
        <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? "active" : null} //para mandarle css
        >
          {number}
        </li>
      );
    }else {
      return null;
    }
  });

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1)

    if(currentPage +1 > maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage -1);

    if(currentPage -1 % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if(pages.length > maxPageNumberLimit){
    pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if(pages.length >= 1){
    pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip; </li>;
  }



  return (
    <div>
      {currentItems ? (
        <>
          {currentItems.map((breed, index) => {
            return (
              <Breed
                id={breed.id}
                key={index}
                name={breed.name}
                weight={breed.weight}
                temperament={breed.temperament}
                img={breed.image}
              />
            );
          })}
          <ul className="pageNumbers">
            <li className="">
              <button
              onClick={handlePrevBtn}
              disabled={currentItems === pages[0]? true : false}
              >
                Prev
              </button>
            </li>
            
           
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
           

            <li>
              <button
              onClick={handleNextBtn}
              disabled={currentPage === pages[pages.length -1] ? true : false}
              >
                Next
              </button>
            </li>
          </ul>
        </>
      ) : currentItems === null  (
        dispatch(getBreeds())
      )}
    </div>
  );
}
