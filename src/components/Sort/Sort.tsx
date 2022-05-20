import React from "react";

import classnames from "classnames";
import { DataState, setSort } from "../../redux/dataSlice";
import { useAppDispatch } from "../../redux/store";

import { SortField, SortDir } from "../../interfaces/interfaces";

import style from "./sort.module.css";

function Sort(props: {data: DataState}) {
  const { sort_dir, sort_field } = props.data;

  const dispatch = useAppDispatch();

  const buttonClass = classnames(style.button, { [style.asc]: sort_dir === SortDir.asc, [style.desc]: sort_dir === SortDir.desc });
  const buttonIdClass = classnames(buttonClass, { [style.active]: sort_field === SortField.id });
  const buttonUserNameClass = classnames(buttonClass, { [style.active]: sort_field === SortField.username });
  const buttonEmailClass = classnames(buttonClass, { [style.active]: sort_field === SortField.email });
  const buttonStatusClass = classnames(buttonClass, { [style.active]: sort_field === SortField.status });

  const setId = () => {
    dispatch(setSort(SortField.id));
  };

  const setUsername = () => {
    dispatch(setSort(SortField.username));
  };

  const setEmail = () => {
    dispatch(setSort(SortField.email));
  };

  const setStatus = () => {
    dispatch(setSort(SortField.status));
  };

  return (
    <div className={style.button_wrapper}>
      <span className={style.text}>Sort by: </span>
      <button className={buttonIdClass} onClick={setId}>{SortField.id}</button>
      <button className={buttonUserNameClass} onClick={setUsername}>{SortField.username}</button>
      <button className={buttonEmailClass} onClick={setEmail}>{SortField.email}</button>
      <button className={buttonStatusClass} onClick={setStatus}>{SortField.status}</button>
    </div>
  );
}

export default Sort;
