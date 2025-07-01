
import React from 'react';
import { Task, TaskPriority } from '../types';
import Checkbox from './ui/Checkbox';
import Button from './ui/Button';
import TrashIcon from './icons/TrashIcon';
import StarIcon from './icons/StarIcon';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFocus: (id: string) => void;
  onUpdateSubTask: (taskId: string, subTaskId: string, completed: boolean) => void;
}

const TaskItem = ({ task, onToggleComplete, onDelete, onToggleFocus, onUpdateSubTask }: TaskItemProps) => {
  const priorityColors = {
    [TaskPriority.HIGH]: 'border-l-red-500',
    [TaskPriority.MEDIUM]: 'border-l-orange-500',
    [TaskPriority.LOW]: 'border-l-sky-500',
  };

  const completedSubTasks = task.subTasks.filter(st => st.completed).length;
  const progress = task.subTasks.length > 0 ? (completedSubTasks / task.subTasks.length) * 100 : 0;

  return (
    <div className={`bg-card text-card-foreground p-4 rounded-lg border-l-4 transition-all duration-300 ${task.completed ? 'opacity-50' : 'opacity-100'} ${priorityColors[task.priority]}`}>
      <div className="flex items-center gap-4">
        <Checkbox 
          id={`task-${task.id}`} 
          checked={task.completed} 
          onChange={() => onToggleComplete(task.id)} 
        />
        <label htmlFor={`task-${task.id}`} className={`flex-grow text-lg font-medium cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
          {task.text}
        </label>
        <div className="flex items-center gap-1 ml-auto">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onToggleFocus(task.id)}
              title={task.isFocused ? "Remove from focus" : "Add to focus"}
            >
              <StarIcon className={`h-5 w-5 ${task.isFocused ? 'fill-yellow-400 text-yellow-500' : 'text-muted-foreground'}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)} className="text-destructive" title="Delete task">
              <TrashIcon className="h-5 w-5" />
            </Button>
        </div>
      </div>
      {task.subTasks.length > 0 && (
         <div className="mt-4 pl-9 space-y-3">
             <div className="w-full bg-slate-200 rounded-full h-1.5 dark:bg-gray-700">
                <div className="bg-sky-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            {task.subTasks.map(subTask => (
                <div key={subTask.id} className="flex items-center gap-3">
                    <Checkbox
                        id={`subtask-${subTask.id}`}
                        checked={subTask.completed}
                        onChange={() => onUpdateSubTask(task.id, subTask.id, !subTask.completed)}
                    />
                    <label htmlFor={`subtask-${subTask.id}`} className={`text-sm flex-grow ${subTask.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {subTask.text}
                    </label>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TaskItem;