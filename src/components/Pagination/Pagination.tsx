import React from "react";

import { setPage } from "../../redux/dataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import style from "./pagination.module.css";

const Pagination = (props: {pages: string, currentPage: number}) => {
  const data = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  const count =  Math.ceil(Number(props.pages) / 3);
  const pages: number[] = []

  for (let item = 1; item <= count; item++ ) {
    pages.push(item)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedPage = Number(event.currentTarget.innerHTML)
    dispatch(setPage(selectedPage))
  }

  const isPrevDisabled = data.current_page === 1;
  const handlePrevClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedPage = data.current_page - 1;
    dispatch(setPage(selectedPage))
  }

  const isNextDisabled = data.current_page === pages.length;
  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedPage = data.current_page + 1;
    dispatch(setPage(selectedPage))
  }

  return (
    <div className={style.button_wrapper}>
      <button className={style.button} key={'Prev'} disabled={isPrevDisabled} onClick={handlePrevClick}>&lt;</button>
      <button className={`${style.button} ${1 === data.current_page ? style.active : ''}`} key={1} onClick={handleClick}>{1}</button>
      {data.current_page > 6 && <span className={style.span}>...</span>}

      {pages
        .filter((page) => 
          page > 1
          && page > data.current_page - 5
          && page < data.current_page + 5
          && page < count)
        .map((page) => (
        <button className={`${style.button} ${page === data.current_page ? style.active : ''}`} key={page} onClick={handleClick}>{page}</button>
      ))}

      {data.current_page < count - 5 && <span className={style.span}>...</span>}
      <button className={`${style.button} ${count === data.current_page ? style.active : ''}`} key={count} onClick={handleClick}>{count}</button>
      <button className={style.button} key={'Next'} disabled={isNextDisabled} onClick={handleNextClick}>&gt;</button>
    </div>
  )
}

export default Pagination;
