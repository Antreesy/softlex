import React, { useState } from 'react';
import { setData, DataState } from '../../redux/dataSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { getData, patchTask } from '../../api/fetch';
import { parseStatus, parseStatusToDone, parseStatusToEdited } from '../../helpers/parser';
import { TaskInfo } from '../../interfaces/interfaces';

import classNames from 'classnames';
import style from "./task.module.css";

const Task = (props: {data: DataState, info: TaskInfo}) => {
  const { email, id, image_path, status, text, username } = props.info;
  const {developerName, current_page, sort_field, sort_dir } = props.data;
  const token = useAppSelector((state) => state.auth.token);

  const [textInput, setTextInput] = useState<string>(text)
  const [error, setError] = useState<string>('')
  const [isDone, setIsDone] = useState<boolean>(parseStatusToDone(status))
  const [isEdited, setIsEdited] = useState<boolean>(parseStatusToEdited(status))
  const [isModify, setIsModify] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  const refreshData = () => {
    getData({developerName, current_page, sort_field, sort_dir})
    .then((res) => dispatch(setData(res)))
  }

  const checkedClass = classNames(style.status, {[style.checked]: isDone})

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value)
  }

  const handleModify = () => {
    setIsModify(true)
  }

  const toggleChecked = () => {
    if (isModify) setIsDone(!isDone);
  }

  const handleSave = () => {
    const newEdited = (text !== textInput) ? true : isEdited;

    if (!textInput.length) {
      setError('enter a text');
      return;
    }

    patchTask({id, developerName, token, text: textInput, status: parseStatus(isDone, newEdited) })
    .then(refreshData)
  
    setIsEdited(newEdited);
    setError('');

    setIsModify(false)
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

      <button className={checkedClass} onClick={toggleChecked} />

      <div className={style.button_wrapper}>
        {!!token && !isModify && <button className={style.button_edit} onClick={handleModify}>Edit</button>}
        {!!token && isModify && <button className={style.button_save} onClick={handleSave}>Save</button>}
        <span className={style.error}>{error}</span>
      </div>
    </div>
  )
}

export default Task;
