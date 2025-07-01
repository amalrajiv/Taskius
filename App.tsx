
import React, { useState, useMemo } from 'react';
import { Task } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  
  const addTask = (task: Omit<Task, 'id' | 'completed' | 'createdAt' | 'subTasks' | 'isFocused'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
      subTasks: [],
      isFocused: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const toggleTaskFocus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isFocused: !task.isFocused } : task
    ));
  };

  const updateSubTask = (taskId: string, subTaskId: string, completed: boolean) => {
    setTasks(tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                subTasks: task.subTasks.map(sub => 
                    sub.id === subTaskId ? { ...sub, completed } : sub
                )
            };
        }
        return task;
    }));
  };

  const { focusedTasks, inboxTasks, completedTasks } = useMemo(() => {
    const focused: Task[] = [];
    const inbox: Task[] = [];
    const completed: Task[] = [];
    
    [...tasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .forEach(task => {
            if (task.completed) {
                completed.push(task);
            } else if (task.isFocused) {
                focused.push(task);
            } else {
                inbox.push(task);
            }
    });
    return { focusedTasks: focused, inboxTasks: inbox, completedTasks: completed };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-slate-800">FocusFlow</h1>
          <p className="text-muted-foreground">Your ADHD-friendly task companion</p>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <TaskForm onAddTask={addTask} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TaskList
            title="Today's Focus"
            tasks={focusedTasks}
            onToggleComplete={toggleTaskComplete}
            onDelete={deleteTask}
            onToggleFocus={toggleTaskFocus}
            onUpdateSubTask={updateSubTask}
            emptyMessage="Star a task from your inbox to focus on it."
          />
          <TaskList
            title="Task Inbox"
            tasks={inboxTasks}
            onToggleComplete={toggleTaskComplete}
            onDelete={deleteTask}
            onToggleFocus={toggleTaskFocus}
            onUpdateSubTask={updateSubTask}
            emptyMessage="All clear! Add a new task above."
          />
        </div>

        {completedTasks.length > 0 && (
            <div className="mt-8">
                <TaskList
                    title="Completed"
                    tasks={completedTasks}
                    onToggleComplete={toggleTaskComplete}
                    onDelete={deleteTask}
                    onToggleFocus={toggleTaskFocus}
                    onUpdateSubTask={updateSubTask}
                    emptyMessage=""
                />
            </div>
        )}
      </main>
    </div>
  );
};

export default App;