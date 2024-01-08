import React from 'react';

const TaskItem = ({ name, complete }) => {
  return (
    <div className='w-full'>
      {complete ? (
        <div className='line-through'>{name} </div>
      ) : (
        <div>{name}</div>
      )}
    </div>
  );
};

export default TaskItem;
