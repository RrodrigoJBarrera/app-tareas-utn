import React, { useEffect, useState } from 'react';
import TaskList from './TaskList/TaskList';
import TaskForm from './TaskForm/TaskForm';
import { v4 as uuidv4 } from 'uuid';
import Statistics from '../Statistics/Statistics';
import TaskFilter from './TaskFilter/TaskFilter';
import Notification from '../Notification/Notification';

const Tasks = () => {
  const [listTask, setListTask] = useState(
    JSON.parse(localStorage.getItem('listTasks')) || []
  );
  const [newName, setNewName] = useState('');
  const [filterName, setFilterName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('listTasks', JSON.stringify(listTask));
  }, [listTask]);

  const filterList = filterName
    ? listTask.filter((t) =>
        t.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : listTask;

  const addTask = (e) => {
    e.preventDefault();
    if (!newName) {
      setNotificationMessage('You must enter a name');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
      return null;
    }
    const newTask = {
      id: uuidv4(),
      name: newName,
      complete: false,
    };
    setListTask(listTask.concat(newTask));
    setNewName('');
  };

  const deleteTask = (id) => {
    const task = listTask.find((t) => t.id === id);
    if (window.confirm(`Delete task: ${task.name}`)) {
      const tasks = listTask.filter((t) => t.id !== id);
      setListTask(tasks);
    }
  };

  const completeTask = (id) => {
    const task = listTask.find((t) => t.id === id);
    const changeComplete = { ...task, complete: !task.complete };
    setListTask(listTask.map((t) => (t.id === id ? changeComplete : t)));
  };

  const deleteAllCompleteTasks = () => {
    if (!listTask.some((t) => t.complete)) {
      return null;
    }

    if (window.confirm('Delete all complete tasks?')) {
      const tasks = listTask.filter((t) => !t.complete);
      setListTask(tasks);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const totalTasks = () => {
    return listTask.length;
  };

  const totalCompleteTasks = () => {
    const tasksComplete = listTask.filter((t) => t.complete);
    return tasksComplete.length;
  };

  const totalIncompleteTasks = () => {
    const tasksComplete = listTask.filter((t) => !t.complete);
    return tasksComplete.length;
  };

  const handleChangeNameFilter = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div className='space-y-4'>
      <TaskFilter
        value={filterName}
        onChange={handleChangeNameFilter}
      ></TaskFilter>
      <Notification
        message={notificationMessage}
        closeNotification={() => setNotificationMessage(null)}
      ></Notification>
      <TaskForm
        addTask={addTask}
        valueName={newName}
        onChangeName={handleNameChange}
      ></TaskForm>

      <TaskList
        list={filterList}
        deleteTask={deleteTask}
        completeTask={completeTask}
      ></TaskList>

      <Statistics
        totalTasks={totalTasks()}
        completeTasks={totalCompleteTasks()}
        incompleteTasks={totalIncompleteTasks()}
      ></Statistics>
      <div className='flex items-center w-full justify-center border rounded-lg border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>
        <button onClick={deleteAllCompleteTasks}>
          Delete all complete tasks
        </button>
      </div>
    </div>
  );
};

export default Tasks;
