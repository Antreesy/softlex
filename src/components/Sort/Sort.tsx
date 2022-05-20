import React from "react";

import { setSort } from "../../redux/dataSlice";
import { useAppDispatch } from "../../redux/store";

import { SortField, SortDir } from "../../interfaces/interfaces";

import classnames from "classnames";
import style from "./sort.module.css";

const Sort = (props: {field?: SortField, direction?: SortDir}) => {

  const dispatch = useAppDispatch();

  const buttonClass = classnames(style.button, { [style.asc]: props.direction === SortDir.asc, [style.desc]: props.direction === SortDir.desc})
  const buttonIdClass = classnames(buttonClass, { [style.active]: props.field === SortField.id})
  const buttonUserNameClass = classnames(buttonClass, { [style.active]: props.field === SortField.username})
  const buttonEmailClass = classnames(buttonClass, { [style.active]: props.field === SortField.email})
  const buttonStatusClass = classnames(buttonClass, { [style.active]: props.field === SortField.status})

  const setId = () => {
    dispatch(setSort(SortField.id))
  }

  const setUsername = () => {
    dispatch(setSort(SortField.username))
  }

  const setEmail = () => {
    dispatch(setSort(SortField.email))
  }

  const setStatus = () => {
    dispatch(setSort(SortField.status))
  }

  return (
    <div className={style.button_wrapper}>
      <span className={style.text}>Sort by: </span>
      <button className={buttonIdClass} onClick={setId}>id</button>
      <button className={buttonUserNameClass} onClick={setUsername}>username</button>
      <button className={buttonEmailClass} onClick={setEmail}>email</button>
      <button className={buttonStatusClass} onClick={setStatus}>status</button>
    </div>
  )
}

export default Sort;
