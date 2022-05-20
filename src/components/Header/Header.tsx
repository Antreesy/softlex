import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setToken, setUser, resetToken } from "../../redux/authSlice";

import { authUser } from "../../api/fetch";

import style from "./header.module.css";

const Header = () => {
  const auth = useAppSelector((state) => state.auth);
  const data = useAppSelector((state) => state.data);
  const [username, setUsername] = useState<string>(auth.username)
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch();

  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const signIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    authUser({developer: data.developerName, username, password})
      .then((res) => dispatch(setToken(res.token)))
      dispatch(setUser(username))
  }

  const signOut = () => {
    dispatch(resetToken())
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <h1 className={style.heading}>Softlex test task</h1>

        {auth.token ? (
          <div>
            <span className={style.username}>{`Welcome, ${auth.username}`}</span>
            <button className={style.button} onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <form className={style.form} onSubmit={signIn}>
            <label className={style.label}>
              <span className={style.label_text}>Username</span>
              <input
                className={style.input}
                type="text"
                value={username}
                onChange={onChangeUserName}
              />
            </label>
            <label className={style.label}>
              <span className={style.label_text}>Password</span>
              <input
                className={style.input}
                type="password"
                value={password}
                onChange={onChangePassword}
              />
            </label>
            <button className={style.button} type="submit">Sign in</button>
          </form>
        )}
      </div>
    </header>
  )
}

export default Header;
