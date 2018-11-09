import * as types from './actionTypes';

export const testData = data => ({
  type: types.TEST_DATA,
  payload: data
});

export const setLoggedIn = () => ({
  type: types.SET_LOGGED_IN
});

export const updateUserInformation = userData => ({
  type: types.UPDATE_USER_DATA,
  payload: userData
});

export const formCompleted = () => ({
  type: types.FORM_COMPLETED
});
