import { Info, SortDir, SortField } from "../interfaces/interfaces";

const address = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'

export interface GetDataPayload {
  developerName: string;
  sort_field?: SortField;
  sort_dir?: SortDir;
  current_page?: number;
}

export const getData = async (payload: GetDataPayload): Promise<Info> => {
  const endpoint = address + ''
  const devQuery = `?developer=${payload.developerName}`;
  const sortParamQuery = `&sort_field=${payload.sort_field}` || '';
  const sortDirectQuery = `&sort_direction=${payload.sort_dir}` || '';
  const sortPageQuery = `&page=${payload.current_page}` || '';

  const finalAddress = endpoint + devQuery + sortParamQuery + sortDirectQuery + sortPageQuery;

  const res = await fetch(finalAddress).then((res) => res.json())
  
  return res.message;
}

interface AuthUserPayload {
  developerName: string,
  username: string,
  password: string,
}

export const authUser = async (payload: AuthUserPayload): Promise<{token: string}> => {
  const endpoint = address + 'login/'
  const devQuery = `?developer=${payload.developerName}`;
  const finalAddress = endpoint + devQuery;

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

interface PostTaskPayload {
  developerName: string,
  username: string,
  email: string,
  text: string,
}

export const postTask = async (payload: PostTaskPayload): Promise<any> => {
  const endpoint = address + 'create/'
  const devQuery = `?developer=${payload.developerName}`;
  const finalAddress = endpoint + devQuery;

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

interface PatchTaskPayload {
  id: number,
  developerName: string,
  token: string,
  text: string,
  status: number
}

export const patchTask = async (payload: PatchTaskPayload): Promise<any> => {
  const endpoint = address + 'edit/'
  const devQuery = `${payload.id}?developer=${payload.developerName}`;
  const finalAddress = endpoint + devQuery;

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