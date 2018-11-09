import * as types from '../actions/actionTypes';

const initialState = {
  data: [],
  loggedIn: false,
  formCompleted: false,
  id: '',
  firstName: '',
  lastName: '',
  phone: ''
};

const jobSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TEST_DATA:
      return {
        ...state,
        data: action.payload
      };
    case types.SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: true
      };
    case types.FORM_COMPLETED:
      let formCompletedState = Object.assign({}, state);
      formCompletedState.formCompleted = true;
      return formCompletedState;
    case types.UPDATE_USER_DATA:
      // console.log(action.payload.data.user.applications)
      let newData = action.payload.data.user.applications;
      let updateUserState = Object.assign({}, state);
      updateUserState.id = action.payload.data.user.id;
      updateUserState.firstName = action.payload.data.user.firstName;
      updateUserState.lastName = action.payload.data.user.lastName;
      updateUserState.phone = action.payload.data.user.phone;
      updateUserState.data = [];
      for (let i = 0; i < newData.length; i++) {
        updateUserState.data.push(newData[i]);
      }
      return updateUserState;
    default:
      return state;
  }
};

export default jobSearchReducer;
