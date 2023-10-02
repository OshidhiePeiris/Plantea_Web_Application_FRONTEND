import GoogleUathActionTypes from "./googleauth.types";
import axios from 'axios';

export const googleoAuth = () => async (dispatch) => {
    try {
      dispatch({ type: GoogleUathActionTypes.GOOGLE_AUTH_REQUEST});
  
      const { data } = await axios.get(`/auth/google`);
  
      dispatch({
        type: GoogleUathActionTypes.GOOGLE_AUTH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GoogleUathActionTypes.GOOGLE_AUTH_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };