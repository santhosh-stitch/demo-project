import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import axios from 'axios';
import store from '../store/Type';

const API = axios.create();

const CreateCustomer = () =>{
  
  const authorization = `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [emailType, setEmailType] = useState('');
  const [addressType, setAddressType] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const[state, setState] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();
    try{
      console.log(process.env.REACT_APP_URL);
      console.log(process.env.REACT_APP_AUTH_TOKEN);
      const response = await API.post(
        process.env.REACT_APP_URL + "/v1/stitchapp/api",
        {
          token: `Bearer ${store.getState().tokenId?.token?.tokenId}`,
          endPoint: "v1/customers",
          httpMethod: "POST",
          request:{
            primaryPerson: {
                firstName: firstName,
                lastName: lastName,
            },
            address: {
                 type: "home",
                 line1: address,
                 postalCode: postalCode,
                 country: "IN"
            },
            phone: {
                type: "mob",
                phoneNumber: phoneNumber,
                countryCode: "876"
            },
            email: {
                type: "personal",
                email: email,
                state: "verified",
            },
            "programName": "sr-program-335",
        },
        }
        ,{
          headers:{
            authorization: authorization,
          }
        }
        );
        setState(response.data);
        if(response.status === 200){
          setSuccess("Customer Created Successfully!")
        }
        console.log(state);
    }catch (e){
      console.log(e);
    }
  }
  return (
    <div className='base'>
        <header className='App-header'>
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <h3>Create Customer</h3>
              <div>
                <Box>
                  <TextField
              // InputProps={{ style: { fontSize: 16 } }}
             //   InputLabelProps={{ style: { fontSize: 40 } }, {shrink: true}}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="firstName"
              onChange={e =>setFirstName(e.target.value)}
              label="First Name*"
              />
              {"    "}
             <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="lastName"
              onChange={e => setLastName(e.target.value)}
              label="Last Name*"
              />
              </Box>
            </div>
            <br></br>
            <div>
              <Box>
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
             // type=""
              id="outlined-required"
              name="dob"
              onChange={e => setDob(e.target.value)}
              label="Date Of Birth"
              /> 
            {"    "}
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="gender"
              onChange={e => setGender(e.target.value)}
              label="Gender"
              />
          
            </Box>
            </div>
            <br></br>
            <div>
              <Box>
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="email"
              onChange={e => setEmail(e.target.value)}
              label="Email*"
              />
              {"    "}
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="emailType"
              onChange={e => setEmailType(e.target.value)}
              label="Email Type*"
              />
              </Box>
            </div>
            <br></br>
            <div>
              <Box>
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="addressType"
              onChange={e => setAddressType(e.target.value)}
              label="Address Type*"
              />
            {"    "}
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="address"
              onChange={e => setAddress(e.target.value)}
              label="Address*"
              />
              </Box>
            </div>
            <br></br>
            <div>
              <Box>
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="postalCode"
              onChange={e => setPostalCode(e.target.value)}
              label="Postal Code*"
              />
            {"    "}
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="country"
              onChange={e => setCountry(e.target.value)}
              label="Country*"
              />
              </Box>
            </div>
            <br></br>
            <div>
              <Box>
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="phoneType"
              onChange={e => setPhoneType(e.target.value)}
              label="Phone Type*"
              />
            {"    "}
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="countryCode"
              onChange={e => setCountryCode(e.target.value)}
              label="Country Code*"
              />
            {"    "}
           
              <TextField
              // InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ shrink: true }}
              id="outlined-required"
              name="phoneNumber"
              onChange={e => setPhoneNumber(e.target.value)}
              label="Phone Number*"
              />
               </Box>
              
            </div>

            <br></br>
            <div>
            <Button
            variant='contained'
            type='submit'
            >
            Create Customer
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

export default CreateCustomer;