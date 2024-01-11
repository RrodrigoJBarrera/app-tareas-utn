import React, { useEffect, useRef, useState } from 'react';
import TaskList from './TaskList/TaskList';
import TaskForm from './TaskForm/TaskForm';
import { v4 as uuidv4 } from 'uuid';
import Statistics from '../Statistics/Statistics';
import TaskFilter from './TaskFilter/TaskFilter';
import Notification from '../Notification/Notification';
import tasksService from '../../services/tasks';

const Tasks = () => {
  const [listTask, setListTask] = useState([]);
  const [newName, setNewName] = useState('');
  const [filterName, setFilterName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    tasksService
      .getAll()
      .then((initialTasks) => {
        setListTask(initialTasks);
      })
      .catch((error) => {
        setNotificationMessage(`Error load tasks: ${error.message}`);
      });
  }, []);

  const filterList = filterName
    ? listTask.filter((t) =>
        t.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : listTask;

  const addTask = (e) => {
    e.preventDefault();
    if (inputValidation(newName)) {
      setNotificationMessage('You must enter a name');
      inputRef.current.focus();
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
    tasksService.create(newTask).then((returnedTask) => {
      setListTask(listTask.concat(returnedTask));
      setNewName('');
    });
  };

  const inputValidation = (text) => {
    const regex = /^(?!\s*$).+/;
    if (regex.test(text)) {
      return false;
    }
    return true;
  };

  const deleteTask = (id) => {
    const task = listTask.find((t) => t.id === id);
    if (window.confirm(`Delete task: ${task.name}`)) {
      tasksService
        .remove(id)
        .then(() => {
          const tasks = listTask.filter((t) => t.id !== id);
          setListTask(tasks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const completeTask = (id) => {
    const task = listTask.find((t) => t.id === id);
    const changeComplete = { ...task, complete: !task.complete };
    tasksService
      .update(task.id, changeComplete)
      .then((returnTask) => {
        setListTask(listTask.map((t) => (t.id === task.id ? returnTask : t)));
      })
      .catch((error) => {
        console.log('Error change complete task', error);
      });
  };

  const deleteAllCompleteTasks = () => {
    if (!listTask.some((t) => t.complete)) {
      return null;
    }

    if (window.confirm('Delete all complete tasks?')) {
      const tasks = listTask.filter((t) => t.complete);
      tasks.map((t) => {
        tasksService
          .remove(t.id)
          .then(() => {
            const updateTastk = listTask.filter((t) => !t.complete);
            setListTask(updateTastk);
          })
          .catch((error) => {
            console.log(error);
          });
      });
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
    <div className='space-y-4 '>
      <TaskFilter
        value={filterName}
        onChange={handleChangeNameFilter}
      ></TaskFilter>
      <Notification
        message={notificationMessage}
        closeNotification={() => setNotificationMessage(null)}
      ></Notification>
      <TaskForm
        inputRef={inputRef}
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
