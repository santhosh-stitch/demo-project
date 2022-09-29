import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import MultiFactorAuthenticationForm from "../../components/forms/MultiFactorAuthenticationForm";
import { mfaSetupVerify, mfaChallenge } from "../../services/authService";
//  import { useHistory } from "react-router-dom";
import store from "../../store";
import { setLoading, removeLoading } from "../../store/actions/loadingAction";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Hidden } from "@material-ui/core";
import Mfalogo from "../../assets/images/authentication.png"

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "100%",
    maxWidth: "169px",
    height: "100px",
  },
}));

const MultiFactorAuthentication = ({ loading }) => {
  const errMsg = "Incorrect code. Please retry or send new code.";
  // const history = useHistory();
  const classes = useStyles();

  const [backendError, setBackendError] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [oob, setOob] = React.useState(null);

  React.useEffect(() => {
    const rootUrl = window.location.href;
    const urlArray = rootUrl.split("token=");
    const urlArray2 = urlArray[1].split("&oob_code=");
    setOob(urlArray2[1]);
    setToken(urlArray2[0]);
  }, []);

  const mfaVerify = async (data) => {
    try {
      store.dispatch(setLoading());
      setBackendError(null);
      const response = await mfaSetupVerify({
        token: token,
        oob: oob,
        otp: data,
      });
      response && store.dispatch(removeLoading());
    } catch (err) {
      console.log(err.response.data);
      if (err.response && err.response.data.error === "invalid_grant") {
        setBackendError(errMsg);
      }
      if (err.response && err.response.data.error === "expired_token") {
        // history.replace("/");
      }
      store.dispatch(removeLoading());
    }
  };
  const reSendOTP = async (data) => {
    try {
      setBackendError(null);
      const mfaChallengeRes = await mfaChallenge(token);
      console.log(mfaChallengeRes);
      if (mfaChallengeRes.data) {
        setOob(mfaChallengeRes.data.oob_code);
      }
    } catch (err) {
      // history.replace("/");
      console.log(err.response.data);
    }
  };

  return (
    <AuthLayout 
      heading="Multi Factor Authentication."
      subHeading="Enter the OTP send to your Mobile Number for Authentication"
    >
      <Hidden smDown>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2%",
            }}
          >
            <img src={Mfalogo} alt="MFA" className={classes.icon} />
          </div>
        </Hidden>
      <MultiFactorAuthenticationForm
        getValue={(data) => {
          mfaVerify(data);
        }}
        resend={() => reSendOTP()}
        backendError={backendError}
        loading={loading}
      />
    </AuthLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps, null)(MultiFactorAuthentication);
