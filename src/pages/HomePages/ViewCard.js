import React, { useState, useEffect } from 'react';
import './view.css';
import axios from 'axios';
import { Box } from '@mui/material';
import store from '../store/Type';
import './view.css';

const API = axios.create();
const ViewCard = () =>{
  const [customerNumber, setCustomerNumber] = useState('10000020050769');
  const [cardNumber, setCardNumber] = useState('9557567071789836331');
  const [state, setState] = useState([]);
    
React.useEffect(() => {
  const getCard = async () => {
    // event.preventDefault();
const authorization = `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`;

try {
     console.log(process.env.REACT_APP_URL);
      const response = await API.post(
        process.env.REACT_APP_URL + "/v1/stitchapp/api",
   {
    token: `Bearer ${store.getState().tokenId.token.tokenId}`,
    endPoint: `/v1/cards/${customerNumber}/${cardNumber}`,
    httpMethod: "GET",
  },
  {
    headers:{
      authorization: authorization,
    }
    },
  );
  setState(response.data);
  // console.log(response);
  console.log(response.data);
  console.log(state);
  // const res = await response.json();
  // console.log(res.data);
}catch(e) {
  console.log(e);
}
}
  getCard();
}, []);

const getMaskedName = () =>{
  const firstName = state.embossedName.split("/");
}
return (
  
<header className='App-header'>
<Box>
  <div>
    <h3>Card Details</h3>
    <table>
    <tbody>
      <tr>
        <th>Cardholder First Name</th>
        <th>Cardholder Last Name</th>
        <th>PAN Last Four</th>
        <th>Card Type</th>
        <th>State</th>
        <th>Block</th>
        <th>Expiry</th>
      </tr>
      <tr>
        <td>{state.embossedName}</td>
        <td>{state.embossedName}</td>
        <td>{state.panLast4}</td>
        <td>{state.type}</td>
        <td>{state.state}</td>
        <td>Yes</td>
        <td>{state.expiry}</td>
      </tr>
      </tbody>
    </table>
  </div>
      </Box>
        </header>
  
  );
}

export default ViewCard;
// "creationTime": 1638188368971,
// "modifiedTime": 1638188368971,
// "cardNumber": "3108239715587390919",
// "embossedName": "Mohamed A Doe",
// "panFirst6": "4XXX11",
// "panLast4": "0055",
// "type": "phy",
// "state": "created",
// "sequenceNumber": 1,
// "pinFailCount": 0,
// "reissue": false,
// "expiry": "202607",
// "cardProfileName": "Titanium Card",
// "customerNumber": "10000020130645",
// "programName": "Fintech X Titanium"
