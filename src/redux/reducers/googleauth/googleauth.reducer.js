import GoogleUathActionTypes from "./googleauth.types";

export const productProCountReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case GoogleUathActionTypes.GOOGLE_AUTH_REQUEST:
      return { loading: true, message:"success" };
    case GoogleUathActionTypes.GOOGLE_AUTH_SUCCESS:
      return { loading: false, message:"Fail" };
    case GoogleUathActionTypes.GOOGLE_AUTH_FAILURE:
      return { loading: false, error: "Fail" };
    default:
      return state;
  }
};