
import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  title: string;
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFocus: (id: string) => void;
  onUpdateSubTask: (taskId: string, subTaskId: string, completed: boolean) => void;
  emptyMessage: string;
}

const TaskList = ({ title, tasks, emptyMessage, ...props }: TaskListProps) => {
  const taskItemProps = {
      onToggleComplete: props.onToggleComplete,
      onDelete: props.onDelete,
      onToggleFocus: props.onToggleFocus,
      onUpdateSubTask: props.onUpdateSubTask,
  }
  return (
    <div className="p-4 bg-slate-100/50 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-slate-700">{title}</h2>
      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} {...taskItemProps} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-4 border-2 border-dashed rounded-lg text-muted-foreground">
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;