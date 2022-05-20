import React, { useEffect, useState } from "react";

import { DataState, setPage } from "../../redux/dataSlice";
import { useAppDispatch } from "../../redux/store";

import style from "./pagination.module.css";

function Pagination(props: {data: DataState}) {
  const { total_task_count, current_page } = props.data;
  const [count, setCount] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const pagesAmount = Math.ceil(Number(total_task_count) / 3);
    setCount(pagesAmount);
    setPages(Array.from({ length: pagesAmount }, (_v, k) => k + 1));
  }, [props.data]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedPage = Number(event.currentTarget.innerHTML);
    dispatch(setPage(selectedPage));
  };

  const isPrevDisabled = current_page === 1;
  const handlePrevClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedPage = current_page - 1;
    dispatch(setPage(selectedPage));
  };

  const isNextDisabled = current_page === pages.length;
  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedPage = current_page + 1;
    dispatch(setPage(selectedPage));
  };

  return (
    <div className={style.button_wrapper}>
      <button className={style.button} key="Prev" disabled={isPrevDisabled} onClick={handlePrevClick}>&lt;</button>
      <button className={`${style.button} ${current_page === 1 ? style.active : ""}`} key={1} onClick={handleClick}>{1}</button>
      {current_page > 6 && <span className={style.span}>...</span>}

      {pages
        .filter((page) => page > 1
          && page > current_page - 5
          && page < current_page + 5
          && page < count)
        .map((page) => (
          <button className={`${style.button} ${page === current_page ? style.active : ""}`} key={page} onClick={handleClick}>{page}</button>
        ))}

      {current_page < count - 5 && <span className={style.span}>...</span>}
      <button className={`${style.button} ${count === current_page ? style.active : ""}`} key={count} onClick={handleClick}>{count}</button>
      <button className={style.button} key="Next" disabled={isNextDisabled} onClick={handleNextClick}>&gt;</button>
    </div>
  );
}

export default Pagination;
