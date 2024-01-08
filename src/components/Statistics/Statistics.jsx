import React from 'react';

const Statistics = ({ totalTasks, completeTasks, incompleteTasks }) => {
  return (
    <div className='ps-2'>
      <div>Tasks: {totalTasks}</div>
      <div>Complete: {completeTasks}</div>
      <div>Incomplete: {incompleteTasks}</div>
    </div>
  );
};

export default Statistics;
