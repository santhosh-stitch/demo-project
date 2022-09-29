import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import store from '../store/Type';
import { Box } from '@mui/system';

const API = axios.create();
const Unblock = () =>{
  
    const authorization = `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`;
    const [customerNumber, setCustomerNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [memo, setMemo] = useState('');
    const [state, setState] = useState('');
    const [blockId, setBlockId] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
     try {
         console.log(process.env.REACT_APP_URL);
         const res = await API.post(
          process.env.REACT_APP_URL + "/v1/stitchapp/api",
          {
            token: `Bearer ${store.getState().tokenId?.token?.tokenId}`,
            endPoint: `v1/cardblocks/${customerNumber}/${cardNumber}`,
            httpMethod: "GET",
          }
          ,{
            headers:{
              authorization: authorization,
            }
          }
          );
          setBlockId(res.data[0].blockId);
          console.log(res.data[0].blockId);
          const response = await API.post(
            process.env.REACT_APP_URL + "/v1/stitchapp/api",
       {
        token: `Bearer ${store.getState().tokenId?.token?.tokenId}`,
        endPoint: `v1/cardblocks/${customerNumber}/${cardNumber}/${blockId}`,
        httpMethod: "PUT",
        request: {
        memo: memo
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
        
        setSuccess("Unblock Successfully!");
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
      <h3>Unblock</h3>
            <div>
              <TextField
              multiline
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
              multiline
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
              multiline
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="releaseMemo"
              onChange={e => setMemo(e.target.value)}
              label="Release Memo*"
              />
              </div>
              <br></br>
            <div>
            <Button
            variant='contained'
            type='submit'
            >
            Unblock
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
export default Unblock;