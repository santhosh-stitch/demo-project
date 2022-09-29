import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../Login.css';
import axios from 'axios';
import store from '../store/Type';
import { Box } from '@mui/material';
 
const API = axios.create();
const Block = () =>{
  
  const authorization = `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`;
  const [customerNumber, setCustomerNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [reason, setReason] = useState('');
  const [memo, setMemo] = useState('');
  const [state, setState] = useState([]);
  const [card, setCard] = useState('');
  const [success, setSuccess] =useState('');
 
  const handleSubmit = async (event) => {
      
    event.preventDefault();

      try {
       console.log(process.env.REACT_APP_URL);
       const res = await API.post(
        process.env.REACT_APP_URL + "/v1/stitchapp/api",
        {
          token: `Bearer ${store.getState().tokenId.token.tokenId}`,
          endPoint: `v1/cardblocks`,
          httpMethod: "POST",
          request:{
            customerNumber: customerNumber,
            cardNumber: cardNumber,
            reason: reason,
            memo: memo
          }
        },
        {
          headers:{
            authorization: authorization,
          }
          
        });
        setCard(res.data);
        console.log(res.data);
        const response = await API.post(
          process.env.REACT_APP_URL + "/v1/stitchapp/api",
     {
      token: `Bearer ${store.getState().tokenId.token.tokenId}`,
      endPoint: "v1/cardblocks",
      httpMethod: "POST",
      request: {
      customerNumber: customerNumber,
      cardNumber: cardNumber,
      reason: reason,
      memo: memo,
      },
    }
    ,{
      headers:{
        authorization: authorization,
      }
      
    }
    );
    setState(response.data);
    console.log(state);
    if(response.status === 200){
      setSuccess("Card Blocked!");
    }
    console.log(success)
  
  }catch(e) {
    console.log(e);
  }
}

return (
    <div className='base'>
        <header className='App-header'>
        <form onSubmit={(e) => {handleSubmit(e)}}>
      <h3>Block</h3>
            <div>
              <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="customerNumber"
              onChange={e => setCustomerNumber(e.target.value)}
              label="Customer Number*"
              />
            </div>
              <br></br>
            <div>
              <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="cardNumber"
              onChange={e => setCardNumber(e.target.value)}
              label="Card Number*"
              />
            </div>
              <br></br>
            <div>
              <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="reason"
              onChange={e => setReason(e.target.value)}
              label="Reason*"
              /> 
            </div>
            <br></br>
            <div>
              <TextField
              multiline
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="memo"
              onChange={e => setMemo(e.target.value)}
              label="Memo*"
              />
            </div>
            <div>
              <br></br>
            <Button
            variant='contained'
            type='submit'
            >
            Block
            </Button>
            </div>
            <Box>
              <h3 >{success}</h3>
              </Box>
            </form>
        </header>
    </div>
  );
}
export default Block;


/*
 const res = await axios.post(
    'https://sandbox.stitch.fi/v1/auth/login',
   { partnerName: partnerName,
     userName: userName,
     password: password,
  },
  {
  headers: {
    'content-type': 'application/json',
    'Accept': '*'
  },
});
*/