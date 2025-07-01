import React, { useState } from 'react';
import { Task, TaskPriority } from '../types';
import Button from './ui/Button';
import PlusIcon from './icons/PlusIcon';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt' | 'subTasks' | 'isFocused'>) => void;
}

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask({ text, priority });
      setText('');
      setPriority(TaskPriority.MEDIUM);
    }
  };
  
  const priorityClasses = {
      [TaskPriority.HIGH]: "bg-red-500 hover:bg-red-600",
      [TaskPriority.MEDIUM]: "bg-orange-500 hover:bg-orange-600",
      [TaskPriority.LOW]: "bg-sky-500 hover:bg-sky-600",
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-50 rounded-lg shadow-inner mb-8">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="flex items-center gap-2">
           <div className="flex h-10 rounded-md border border-input bg-background p-1">
                {Object.values(TaskPriority).map(p => (
                    <button 
                        key={p} 
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`w-full px-3 rounded-sm text-xs font-semibold transition-all duration-200 ${priority.toString() === p.toString() ? `${priorityClasses[p]} text-white shadow` : 'text-muted-foreground hover:bg-slate-200'}`}
                    >
                        {p}
                    </button>
                ))}
           </div>
          <Button type="submit" size="icon">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;