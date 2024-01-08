import React from 'react';

const TaskForm = ({ addTask, valueName, onChangeName }) => {
  return (
    <div>
      <form className='space-x-4' onSubmit={addTask}>
        <input
          className='border-b-2 outline-none '
          type='text'
          name='name'
          id='name'
          placeholder='New Task'
          value={valueName}
          onChange={onChangeName}
        />
        <button className='bg-green-300 p-1  rounded-lg' type='submit'>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
