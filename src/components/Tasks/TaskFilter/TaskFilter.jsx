import React from 'react';

const TaskFilter = ({ value, onChange }) => {
  return (
    <div className='flex  rounded-e-lg items-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='w-6 h-6 p-1 bg-white rounded-s-lg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
        />
      </svg>
      <input
        className=' px-1 rounded-e-lg outline-none  w-full'
        placeholder='Find Task'
        type='text'
        value={value}
        onChange={onChange}
      />{' '}
    </div>
  );
};

export default TaskFilter;
