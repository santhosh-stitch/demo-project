import axios from "axios";

const API = axios.create();

export const getSandboxUserDetails = async (data, token) => {
    try {
      const response = await API.get(
        process.env.REACT_APP_AUTH0_BACKEND_API_URL + "/v1/users",
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  };