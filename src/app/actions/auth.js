import * as actionTypes from "../constants/action-types";
import TokenService from "../services/token";
const tokenService = new TokenService();

export function testAuth() {
  return {
    type: actionTypes.TEST_AUTH
  };
}

export function accessTokenRequested() {
  return {
    type: actionTypes.ACCESS_TOKEN_REQUEST
  };
}

export function accessTokenSuccess({ access_token, refresh_token }) {
  return {
    type: actionTypes.ACCESS_TOKEN_SUCCESS,
    payload: {
      accessToken: access_token,
      refreshToken: refresh_token
    }
  };
}

export function accessTokenFailure() {
  return {
    type: actionTypes.ACCESS_TOKEN_FAILURE
  };
}

export function getAccessToken(code) {
  return dispatch => {
    dispatch(accessTokenRequested());

    tokenService
      .getAccessTokenFromCode(code)
      .then(({ data, error }) => {
        if (error) {
          dispatch(accessTokenFailure());
        }

        let { refresh_token, access_token } = data;
        dispatch(accessTokenSuccess({ access_token, refresh_token }));
      })
      .catch(e => console.log(e));
  };
}
