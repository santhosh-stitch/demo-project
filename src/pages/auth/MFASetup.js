import React from "react";
import {useHistory} from "react-router";
import MFASetupFrom from "../../components/forms/MFASetupForm";
import AuthLayout from "../../components/layouts/AuthLayout";
import store from "../../store";
import { removeLoading, setLoading } from "../../store/actions/loadingAction";

const MFASetup = ({loading}) => {
    const history = useHistory();
    const [token, setToken] = React.useState(null);

    React.useEffect(() =>{
        const rootUrl = window.location.href;
        const urlArray = rootUrl.split("token+=");
        setToken(urlArray[1]);
    }, []);

    const sendOTP = async (value) => {
           try {
               store.dispatch(setLoading());
               const response = await mfa(token, value);
               store.dispatch(removeLoading());
               history.push(
                "/mfa-setup-verify?token=" + token + "&oob_code" + response.data.oob_code
               )
           }catch (error){
            console.log(error);
            store.dispatch(removeLoading());
           }
     };
    return (
        <AuthLayout
        heading="Multi Factor Authentication
            Set Up (Register)"
        subHeading="Enter a phone number that can be used to verify your identity with a text message."
        >
            <MFASetupFrom 
               getValue={(value) => {
                sendOTP(value);
               }}
            />
          
        </AuthLayout>
    )
}