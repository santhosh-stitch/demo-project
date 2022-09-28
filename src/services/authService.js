import axios from "axios";
import store from "../store";
import { setLoading, removeLoading } from "../store/actions/loadingAction";
import auth0 from "auth0-js";

const webAuth = new auth0.webAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    responseType: "token",
});

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
                            const mfaChallengeRes = await 
                        }
                    }
                }
            }
        )
    }
};