import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setData } from '../../redux/dataSlice';

import { getData } from '../../api/fetch';

import { Pagination } from '../../components/Pagination';
import { Sort } from '../../components/Sort';
import { Task } from '../../components/Task';
import { TaskCreate } from '../../components/TaskCreate';

import style from "./main.module.css";

function Main() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);

  useEffect(()=>{
    getData({developer: data.developerName})
      .then((res) => dispatch(setData(res)))
  }, [])

  useEffect(()=>{
    getData({developer: data.developerName, page: data.current_page, sort_field: data.sort_field, sort_direction: data.sort_dir})
      .then((res) => dispatch(setData(res)))
  },[data.current_page, data.sort_field, data.sort_dir])

  return (
    <main className={style.main}>
      <div className={style.container}>
        {data && <Sort field={data.sort_field} direction={data.sort_dir}/>}

        {data && data?.tasks.map((item) => (
          <Task key={item.id} data={item} />
        ))}

        {data && <Pagination pages={data.total_task_count} currentPage={data.current_page} />}

        <TaskCreate developer={data.developerName} />
      </div>
    </main>
  );
}

export default Main;