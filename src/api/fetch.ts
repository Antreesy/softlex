import { Info, QueryParams } from "../interfaces/interfaces";

export const getData = async (payload: QueryParams): Promise<Info> => {
  const homeAddress = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'
  const devQuery = `?developer=${payload.developer}`;
  const sortParamQuery = `&sort_field=${payload.sort_field}` || '';
  const sortDirectQuery = `&sort_direction=${payload.sort_direction}` || '';
  const sortPageQuery = `&page=${payload.page}` || '';

  const finalAddress = homeAddress + devQuery + sortParamQuery + sortDirectQuery + sortPageQuery;

  const res = await fetch(finalAddress).then((res) => res.json())
  
  return res.message;
}

export const authUser = async (payload: {developer: string, username: string, password: string}): Promise<{token: string}> => {
  const homeAddress = 'https://uxcandy.com/~shapoval/test-task-backend/v2/login/'
  const devQuery = `?developer=${payload.developer}`;
  const finalAddress = homeAddress + devQuery;

  const form = new FormData();
  form.append("username", payload.username);
  form.append("password", payload.password);

  const options = {
    method: "POST",
    body: form
  }

  const res = await fetch(finalAddress, options).then((res) => res.json())
  
  return res.message;
}

export const postTask = async (payload: {developer: string, username: string, email: string, text: string}): Promise<{token: string}> => {
  const homeAddress = 'https://uxcandy.com/~shapoval/test-task-backend/v2/create/'
  const devQuery = `?developer=${payload.developer}`;
  const finalAddress = homeAddress + devQuery;

  const form = new FormData();
  form.append("username", payload.username);
  form.append("email", payload.email);
  form.append("text", payload.text);

  const options = {
    method: "POST",
    body: form
  }

  const res = await fetch(finalAddress, options).then((res) => res.json())
  
  return res.message;
}

export const patchTask = async (payload: {id: number, developer: string, token: string, text: string, status: number}): Promise<{token: string}> => {
  const homeAddress = 'https://uxcandy.com/~shapoval/test-task-backend/v2/edit/'
  const devQuery = `${payload.id}?developer=${payload.developer}`;
  const finalAddress = homeAddress + devQuery;

  const form = new FormData();
  form.append("token", payload.token);
  form.append("text", payload.text);
  form.append("status", payload.status.toString());

  const options = {
    method: "POST",
    body: form
  }

  const res = await fetch(finalAddress, options).then((res) => res.json())
  
  return res.message;
}