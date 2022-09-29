import React, { useState, useEffect } from "react"
import axios from 'axios';
import store from "../store/Type";
import './view.css'

const API = axios.create();

const ViewCustomer = () => {
  // event.preventDefault();
 const [customerNumber, setCustomerNumber] = useState('10000020050769');
  // const [cardNumber, setCardNumber] = useState('');
  const [state, setState] = useState([]);
  React.useEffect = (() => {
    const getCustomer = async () => {
    const authorization = `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`;
    try {
      console.log(process.env.REACT_APP_URL);
       const response = await API.post(
         process.env.REACT_APP_URL + "/v1/stitchapp/api",
          {
            token: `Bearer ${store.getState().tokenId.token.tokenId}`,
            endPoint: `/v1/customers/${customerNumber}`,
            httpMethod: "GET",
          },
          {
           headers:{
           authorization: authorization,
             }   
          });
         setState(response.data);
        //  console.log(state);
         console.log(response.data);
         }catch(e) {
         console.log(e);
         }
         }
         getCustomer();
         },[]);
      
    // if (!ViewCustomer) 
    // return (<div>No Record Found</div>)
    return (
    <div className='App-header'>
       
        <h3>Customer Details</h3>
    <table>
      <tbody>
      <tr>
        <th>Customer Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>DOB</th>
        <th>Customer Number</th>
        <th>Address</th>
        <th>Program Name</th>
      </tr>
      <tr>
        <td>santhosh R</td>
        <td>9361127551</td>
        <td>santhoshkumar.raja@stitch.fi</td>
        <td>03/08/1999</td>
        <td>10000230420257</td>
        <td>New Street</td>
        <td>sr-program-719</td>
      </tr>
      </tbody>
      </table>
    </div>
    )
}
export default ViewCustomer;

























































/*import { Button } from '@mui/material';
import axios from 'axios';
//import TextField from 'material-ui/TextField';
import React from 'react';
//import axios from 'axios';


const ViewCustomer = () =>{
   
  const [customerNumber, setCustomerNumber] = React.useState('');

  const handleSubmit = async () =>{
    const res = await axios.get("https://sandbox.stitch.fi/v1/customers/10000070180540",
    {
      headers: {
        'content-type': 'application/json',
        Accept: "application/json"
      },
    });
    console.log(customerNumber);
  }
return (
  <div className='base'>
  <header className='App-header'>
  <form onSubmit={(e) => {handleSubmit(e)}}>
{/*<div>
              <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="customerNumber"
              onChange={e => setCustomerNumber(e.target.value)}
              label="Customer Number*"
              />
            </div>*/
           /* <div>
            <Button
            variant='contained'
            type='submit'
            >
            View Customer
            </Button>
            </div>
         
<h3>View Customer</h3>
<div>
  <div>First Name : </div>
  <br></br>
  <div>Last Name : </div>
  <br></br>
  <div>Gender : </div>
  <br></br>
  <div>Date Of Birth : </div>
  <br></br>
  <div>Customer Number : </div>
  <br></br>
  <div>Risk  : </div>
  <br></br>
  <div>Home Currency :</div>
  <br></br>
  <div>Fee Plan Name : </div>
  <br></br>
  <div>Program Name : </div>
</div>
</form>   
  </header>
</div>

  );
}
export default ViewCustomer;*/