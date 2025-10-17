export type Priority = "p1" | "p2" | "p3";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority?: Priority;
};
