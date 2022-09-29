// import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from '@mui/material';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import './Home.css';
import '../Login.css';
//import styled from 'styled-components';
// {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//   <Tabs  onChange={handleChange} aria-label="basic tabs example">
//     <Tab label="Item One" value={0} />
//     <Tab label="Item Two" value={1} />
//     <Tab label="Item Three" value={2} />
//     <Tab label="Item Three" value={3} />
//     <Tab label="Item Three" value={4} />
//     <Tab label="Item Three" value={5} />
//     <Tab label="Item Three" value={6} />
//   </Tabs>
// </Box> */}
const HomePage= () =>{
  return (
    <div className="base">
  <div className='nav'>
    <Table className='nav ul' >
      <thead>
   <tr>
    <th>
       <span >
        <Link to="/create-customer">Create Customer</Link>
      </span>
    </th>
    <th >
         <span >
      <Link to="/create-card">Create Card</Link>
      </span>
    </th>
    <th >
         <span >
      <Link to="/view-customer">View Customer</Link>
      </span>
    </th>
    <th >
         <span >
      <Link to="/view-card">View Card</Link>
      </span>
    </th>
    <th >
         <span >
      <Link to="/block">Block</Link>
      </span>
    </th>
    <th >
         <span >
      <Link to="/unblock">Unblock</Link>
      </span>
    </th>
    </tr>
    </thead>
    </Table>
  </div>
  </div>
  );
}
export default HomePage;