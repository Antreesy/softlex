import React, { useState } from "react";
import { setData } from "../../redux/dataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { getData, postTask } from "../../api/fetch";
import { validateEmail } from "../../helpers/validation";

import style from "./taskcreate.module.css";

const TaskCreate = (props: {developer: string}) => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<string>('')
  const data = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }
  
  const submitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.length) {
      setError('enter an username');
      return;
    }
    if (!email.length) {
      setError('enter an E-mail');
      return;
    }
    if (!validateEmail(email)) {
      setError('invalid E-mail');
      return;
    }
    if (!text.length) {
      setError('enter a text');
      return;
    }
    
    postTask({developer: props.developer, username, email, text })
    .then(()=> getData({developer: data.developerName, page: data.current_page, sort_field: data.sort_field, sort_direction: data.sort_dir})
    .then((res) => dispatch(setData(res))))

    setUsername('');
    setEmail('');
    setText('');
    setError('');
  }

  return (
    <form className={style.task__wrapper} onSubmit={submitTask}>
      <img className={style.image} src={"https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/75b28f43/1510274400_640.jpg"} alt="img" />
      <div className={style.user}>
        <input className={style.username} type='text' value={username} onChange={onChangeUserName} placeholder={'Enter username'} />
        <input className={style.email} type='text' value={email} onChange={onChangeEmail} placeholder={'Enter E-mail'} />
      </div>

      <input className={style.text} type='text' value={text} onChange={onChangeText} placeholder={'Enter task description'} />

      <div className={style.button_wrapper}>
        <button className={style.button} type='submit'>Create a Task</button>
        <span className={style.error}>{error}</span>
      </div>
    </form>
  )
}

export default TaskCreate;
