import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import store from '../store/Type';
// import { makeStyles } from '@mui/material';
// import BasicTextField from '../Message/FormSuccessMessage';
import { Box } from '@mui/system';

// const useStyles = makeStyles((theme) => ({
//   textStyle: {
//     color: 	"#00FA9A",
//   }
// }));

const API = axios.create();

const CreateCard = () =>{
  const authorization = `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`;
  const [customerNumber, setCustomerNumber] = useState('');
  const [cardProfileName, setCardProfilleName] = useState('');
  const [state, setState] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleSubmit = async (event) => {
      event.preventDefault();
   try {
       console.log(store.getState().Auth);
       console.log(process.env.REACT_APP_URL);
        const response = await API.post(
          process.env.REACT_APP_URL + "/v1/stitchapp/api",
     {
      token: `Bearer ${store.getState().tokenId?.token?.tokenId}`,
      endPoint: "v1/cards",
      httpMethod: "POST",
      request: {
      customerNumber: customerNumber,
      cardProfileName: cardProfileName,
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
      
      setSuccess("Card Created Successfully!");
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
      <h3>Create Card</h3>
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
              name="cardProfilleName"
              onChange={e => setCardProfilleName(e.target.value)}
              label="Card Profile Name*"
              />
            </div>
            <br></br>
            <div>
            <Button
            variant='contained'
            type='submit'
            >
            Create Card
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
export default CreateCard;