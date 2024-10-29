import { PRIORITY, STATUS } from "./constants";

export type Priority = typeof PRIORITY[number];
export type Status = typeof STATUS[number];

export interface Task {
  id: number;
  title: string;
  priority: Priority;
  dateTime: string;
  estimate: number;
  status: Status;
  hash: string;
}
