import React from 'react';
import Tasks from '../components/Tasks/Tasks';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-4'>
      <h1>Task List</h1>
      <Tasks></Tasks>
    </div>
  );
};

export default Home;
