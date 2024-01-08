import React from 'react';
import TaskItem from '../TaskItem/TaskItem';

const TaskList = ({ list, deleteTask, completeTask }) => {
  return (
    <div className='max-h-80 overflow-y-auto h-80'>
      {list.map((task) => (
        <div
          className='flex space-x-2 items-center justify-between py-4 px-2 '
          key={task.id}
        >
          <input
            type='checkbox'
            defaultChecked={task.complete}
            onClick={() => completeTask(task.id)}
          />

          <TaskItem name={task.name} complete={task.complete}></TaskItem>
          <button
            className='px-1 rounded flex bg-red-500 text-sm font-bold'
            onClick={() => deleteTask(task.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
