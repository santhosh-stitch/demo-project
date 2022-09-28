import React from "react";
import SignInForm from "../../components/forms/SignInForm";
import AuthLayout from "../../components/layouts/AuthLayout";

const SignIn = ({loading}) => {

  const login = async (data) =>{
    
  }
    return (
       <AuthLayout heading="Welcome! Please sign in.">
         <SignInForm 
         getValue={(val) => login(val)}/>
      </AuthLayout>
    )
}

export default SignIn;