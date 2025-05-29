// import React from 'react'
// import Dashboard from './components/sidebar'
// import Navbar from './components/Navbar'
// import { Outlet } from 'react-router-dom'

// const App = () => {
//   return (
//     <>
//      <Navbar/>
//      <Dashboard/>
//      <Outlet/>

//     </>
//   )
// }

// export default App

import React from 'react';
import Dashboard from './components/sidebar';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Abc from './components/abc';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Navbar  />
      <div className='flex'>
        <Dashboard />
        <div  className='px-2 w-full'>
          <Abc/>
          <Outlet className=" " />
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default App;
