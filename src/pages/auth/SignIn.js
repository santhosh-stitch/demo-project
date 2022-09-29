import React from "react";
import SignInForm from "../../components/forms/SignInForm";
import AuthLayout from "../../components/layouts/AuthLayout";
import { loginUser } from "../../services/authService";
import store from "../../store"
import { setLoading, removeLoading } from "../../store/actions/loadingAction";
import { connect } from "react-redux";

const SignIn = ({loading}) => {

  const errMsg = "Email or Password was incorrect";

  const [backendError, setBackendError] = React.useState(null);


  const login = async (data) =>{
    store.dispatch(setLoading());
    setBackendError(null);
    const resolveError = (err) => {
      store.dispatch(setLoading());
      if(err.code === "unauthorized") {
        setBackendError("Email is not verified, check your inbox.");
      }else if (err.code === "invalid_grant") {
        setBackendError("Email or password was incorrect.");
      }else if (err.code === "association_required") {
        setBackendError(null);
      }else {
        setBackendError("An error occurred during authentication!");
      }
    };
    try {
       await loginUser({
        data: data,
        resolveError: resolveError,
      });
    }catch (err) {
      console.log(err.response);
      if (err.response) {
        if (err.response.data.message) {
          setBackendError(errMsg);
        } else {
          setBackendError(
            "Too many times using this Crendentials"
          );
        }
      } else if (err.message) {
        setBackendError(err.message);
      }
      store.dispatch(removeLoading());
    }
  }
    return (
       <AuthLayout heading="Welcome! Please sign in.">
         <SignInForm 
            getValue={(value) => login(value)}/>
            {/* backendError={backendError} */}
            {/* loading={loading} */}
      </AuthLayout>
    )
}

const mapStateToProps = state => {
  return {
    loading: state.loading
  }
}
export default connect(mapStateToProps, null)(SignIn);