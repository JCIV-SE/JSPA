import * as actions from '../actions/actionTypes';

//todo: change to Immutable or Immer Map
const initialState = {
  data: [], //! shouldn't be called data
  loggedIn: false, //! maybe there's a more global way of implementing this
  formCompleted: false, //! maybe we can determine form completion from a user action
  id: '', //! shouldn't be open to changing

  //! below might want togo in a "user" state instead
  firstName: '',
  lastName: '',
  phone: ''
};

const jobSearchReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.TEST_DATA:
			return handleTestData(state, action.payload)
		case actions.SET_LOGGED_IN: //! weird, should be boolean toggle
			return handleSetLogIn(state)
		case actions.FORM_COMPLETED:
			return handleFormCompletion(state, action.payload)
		case actions.UPDATE_USER_DATA:
			return handleUpdateUserData(state, action.payload)
		default:
			return state;
	}
};

const handleTestData = (state, payload) => {
	const { data } = payload
	const updatedState = { ...state }

	if (data) {
		updatedState['data'] = data
	}

	return updatedState
}

const handleSetLogIn = (state) => {
	const updatedState = { ...state }

	if (!updatedState.loggedIn) {
		updatedState['loggedIn'] = true
	}

	return updatedState
}

const handleFormCompletion = (state) => {
	const updatedState = { ...state }

	if (!updatedState.formCompleted) {
		updatedState.formCompleted = true
	}

	return formCompletedState;
}

const handleUpdateUserData = (state, payload) => {
	const { data: { user: { id, firstName, lastName, phone, applications } } } = payload && payload
	const updatedState = { ...state }

	if (id) updatedState['id'] = id
	if (firstName) updatedState['firstName'] = firstName
	if (lastName) updatedState['lastName'] = lastName
	if (phone) updatedState['phone'] = phone
	if (applications) updatedState['data'] = applications.slice(0)

	return updateUserState;
}

export default jobSearchReducer;
