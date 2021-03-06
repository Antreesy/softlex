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

export interface TaskInfo {
  email: string;
  id: number;
  image_path: string;
  status: number;
  text: string;
  username: string;
}

export interface Info {
  tasks: TaskInfo[];
  total_task_count: string;
}
