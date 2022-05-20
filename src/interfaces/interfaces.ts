export enum SortField {
  id = "id",
  username = "username",
  email = "email",
  status = "status",
}

export enum SortDir {
  asc = "asc",
  desc = "desc",
}

export interface QueryParams {
  developer: string;
  sort_field?: SortField;
  sort_direction?: SortDir;
  page?: number;
}

export interface TaskData {
  email: string;
  id: number;
  image_path: string;
  status: number;
  text: string;
  username: string;
}

export interface Data {
  tasks: TaskData[];
  total_task_count: string; 
}