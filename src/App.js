import './App.css';

import { useEffect, useState } from "react";
import TodoForm from './Components/TodoForm.jsx';
import Task from './Components/Task.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    setTasks(prev => {
      return [...prev, { name: name, done: false }];
    });
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function handleSortChange(e) {
    setSort(e.target.value);
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.done;
    if (filter === 'incomplete') return !task.done;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'alphabetical') return a.name.localeCompare(b.name);
    if (sort === 'reverse') return b.name.localeCompare(a.name);
    return 0;
  });

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;
    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻';
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <div className="controls">
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        <label>
          Sort:
          <select value={sort} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="reverse">Reverse Alphabetical</option>
          </select>
        </label>
      </div>
      <TodoForm onAdd={addTask} />
      {sortedTasks.map((task, index) => (
        <Task
          key={index}
          {...task}
          onRename={newName => renameTask(index, newName)}
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)}
        />
      ))}
    </main>
  );
}

export default App;
