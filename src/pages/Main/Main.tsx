import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setData } from "../../redux/dataSlice";

import { getData } from "../../api/fetch";

import { Pagination } from "../../components/Pagination";
import { Sort } from "../../components/Sort";
import { Task } from "../../components/Task";
import { TaskCreate } from "../../components/TaskCreate";

import style from "./main.module.css";

function Main() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);
  const {
    developerName, current_page, sort_field, sort_dir,
  } = useAppSelector((state) => state.data);

  useEffect(() => {
    getData({ developerName })
      .then((res) => dispatch(setData(res)));
  }, []);

  useEffect(() => {
    getData({
      developerName, current_page, sort_field, sort_dir,
    })
      .then((res) => dispatch(setData(res)));
  }, [current_page, sort_field, sort_dir]);

  return (
    <main className={style.main}>
      <div className={style.container}>
        <Sort data={data} />

        {data?.tasks.map((item) => (
          <Task key={item.id} data={data} info={item} />
        ))}

        <Pagination data={data} />

        <TaskCreate data={data} />
      </div>
    </main>
  );
}

export default Main;
