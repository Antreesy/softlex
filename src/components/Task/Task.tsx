import React, { useState } from 'react';
import { setModify, resetModify, setData } from '../../redux/dataSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { getData, patchTask } from '../../api/fetch';

import { TaskData } from '../../interfaces/interfaces';

import classNames from 'classnames';
import style from "./task.module.css";

const Task = (props: {data: TaskData}) => {
  const { email, id, image_path, status, text, username } = props.data;
  const data = useAppSelector((state) => state.data);
  const auth = useAppSelector((state) => state.auth);
  const [textInput, setTextInput] = useState<string>(text)
  const [checked, setChecked] = useState<number>(status)
  const [error, setError] = useState<string>('')
  const dispatch = useAppDispatch();

  const isModify = data.modifiedId === id;
  const isDone = ((checked === 10) || (checked === 11))
  const isEdited = ((checked === 1) || (checked === 11))

  const checkedClass = classNames(style.status, {[style.checked]: isDone})

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value)
  }

  const handleModify = () => {
    dispatch(setModify(id))
  }

  const handleChecked = () => {
    if (!isModify) return;

    switch (checked) {
      case 0: setChecked(10); break;
      case 10: setChecked(0); break;
      case 1: setChecked(11); break;
      default: setChecked(1); break;
    }
  }

  const handleSave = () => {
    if (!textInput.length) {
      setError('enter a text');
      return;
    }

    let newChecked = checked;
    if (text !== textInput) {
      newChecked = (checked === 0 || checked === 10) ? checked + 1 : checked;
    }
    setError('');
    setChecked(newChecked);

    patchTask({id, developer: data.developerName, token: auth.token, text: textInput, status: newChecked })
    .then(()=> getData({developer: data.developerName, page: data.current_page, sort_field: data.sort_field, sort_direction: data.sort_dir})
    .then((res) => dispatch(setData(res))))
  
    dispatch(resetModify())
  }

  return (
    <div className={style.task__wrapper}>
      <img className={style.image} src={image_path || "https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/75b28f43/1510274400_640.jpg"} alt="img" />
      <div className={style.user}>
        <span className={style.username}>{username}</span>
        <span className={style.email}>{email}</span>
      </div>
      
      {isModify ? (
          <input className={style.text_input} type='text' value={textInput} onChange={onChangeText} placeholder={'Enter task description'} />
      ) : (
          <span className={style.text}>{text}</span>
      )}

      <span className={style.status_edited}>{isEdited ? 'edited' : ''}</span>

      <button className={checkedClass} onClick={handleChecked} />

      <div className={style.button_wrapper}>
        {!!auth.token && !isModify && <button className={style.button_edit} onClick={handleModify}>Edit</button>}
        {!!auth.token && isModify && <button className={style.button_save} onClick={handleSave}>Save</button>}
        <span className={style.error}>{error}</span>
      </div>
    </div>
  )
}

export default Task;
