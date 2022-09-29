import axios from "axios";
import store from "../store";
import auth0 from "auth0-js";
import { setSandbox, removeSandbox } from "../store/actions/sandboxAction";
import { setUser, removeUser } from "../store/actions/userAction";
import { setToken, removeToken } from "../store/actions/authAction";
import { getSandboxUserDetails } from "./sandboxService";
import { Await } from "react-router";

const webAuth = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    responseType: "token",
});

const API = axios.create();

export const mfaChallenge = async (token) => {
    try {
        const response = await axios.post(
            process.env.REACT_APP_AUTH0_MANAGEMENT_API_URL + "/mfa/challenge",
            {
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
                client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
                challenge_type: "oob",
                mfa_token: token,
            }
        );
        return response;
    }catch (err){
        console.log(err.response);
        if(
        err.response.data &&
        err.response.data.error === "association_required"
        ) {
            window.location.replace("/mfa-setup?token=" + token);
        }
        throw err;
    }
};

export const loginUser = async ({ data, resovleError }) => {
    try {
        webAuth.client.login(
            {
               realm: process.env.REACT_APP_AUTH0_PRODUCTION_CONNECTION,
               username: data.email,
               password: data.password,
               scope: "openid profile email",
               audience: process.env.REACT_APP_AUTH0_MANAGEMENT_API_URL + "/api/v2/",
            },
            async function (err, result) {
                if (err) {
                    console.log(err);
                    if (err && err.code === "mfa_required") {
                        console.log(err.original);
                        try {
                            const  mfaChallengeRes = await mfaChallenge(
                                err.original.response.body.mfa_token
                            );
                            if (mfaChallengeRes.data) {
                                window.location.replace(
                                    "/mfa?token=" +
                                    err.original.response.body.mfa_token +
                                    "&oob_code=" +
                                    mfaChallengeRes.data.oob_code
                                );
                            }
                        }catch (e) {
                           resovleError(e.response.data);
                        }
                    }else {
                        resovleError(err);
                    }
                }
                if (result){
                    webAuth.client.userInfo(
                        result.accessToken,
                        async function (user) {
                          const userRes = await fetchUser(user.sub, result.accessToken);
                          const sandboxRes = await getSandboxUserDetails(
                            {
                              userId: user.sub,
                            },
                            result.accessToken
                          );
                          const enrollmentRes = await getEnrollments(
                            user.sub,
                            result.accessToken
                          );
                          const phoneNumber = enrollmentRes[0]
                            ? enrollmentRes[0].phone_number
                            : "";
            
                          
                          const user_metadata = userRes.data.user_metadata;
                
                            await store.dispatch(
                            setUser({ ...user, user_metadata, phoneNumber })
                          );
                          sandboxRes && (await store.dispatch(setSandbox(sandboxRes.data)));

                       await store.dispatch(setToken(result.accessToken));
                          }     
              );
                }
                return result;
            }
        );
    } catch (error) {
        resovleError(error.response);
        throw error;
    }
};

export const fetchUser = async (id, token) => {
    try {
      const response = await API.get(
        process.env.REACT_APP_AUTH0_MANAGEMENT_API_URL + "/api/v2/users/" + id,
        token && {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(response);
      return response;
    } catch (e) {
      throw e;
    }
  };

  export const getEnrollments = async (id, token) => {
    try {
      const response = await API.get(
        process.env.REACT_APP_AUTH0_MANAGEMENT_API_URL +
          "/api/v2/users/" +
          id +
          "/enrollments",
        token && {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(response);
      return response.data;
    } catch (e) {
      throw e;
    }
  };

  export const mfaSetupVerify = async (data) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_AUTH0_MANAGEMENT_API_URL + "/oauth/token",
        {
          client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
          client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
          grant_type: "http://auth0.com/oauth/grant-type/mfa-oob",
          mfa_token: data.token,
          oob_code: data.oob,
          binding_code: data.otp.otp,
        }
      );
      if (response.data) {
        webAuth.client.userInfo(
          response.data.access_token,
          async function (err, user) {
            const userRes = await fetchUser(user.sub, response.data.access_token);
            const sandboxRes = await getSandboxUserDetails(
              user.email,
              response.data.access_token
            );
            const enrollmentRes = await getEnrollments(
              user.sub,
              response.data.access_token
            );
            const phoneNumber = enrollmentRes[0]
              ? enrollmentRes[0].phone_number
              : "";
            const user_metadata = userRes.data.user_metadata;
            await store.dispatch(
              setUser({ ...user, user_metadata, phoneNumber })
            );
            sandboxRes && (await store.dispatch(setSandbox(sandboxRes.data)));
            await store.dispatch(setToken(response.data.access_token));
            return response;
          }
        );
      } else {
        return response;
      }
    } catch (e) {
      throw e;
    }
  };