import React from "react";
import SignInForm from "../../components/forms/SignInForm";
import AuthLayout from "../../components/layouts/AuthLayout";

const SignIn = ({loading}) => {
    return (
       <AuthLayout heading="Welcome! Please sign in.">
         <SignInForm />
      </AuthLayout>
    )
}

export default SignIn;