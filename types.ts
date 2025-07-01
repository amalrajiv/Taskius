
export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Task {
  id: string;
  text: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string; 
  subTasks: SubTask[];
  isFocused: boolean;
}
