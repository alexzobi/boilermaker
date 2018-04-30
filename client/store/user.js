import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const ADD_POINTS = 'ADD_POINTS';
const GET_USER_CARDIOMON = 'GET_USER_CARDIOMON';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const getUserCardiomon = userCardiomon => (
  {type: GET_USER_CARDIOMON, userCardiomon}
);
const removeUser = () => ({type: REMOVE_USER});
const addPoints = points => (
  {type: ADD_POINTS, points}
);

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        console.log(res.data)
        dispatch(getUser(res.data || defaultUser));
      })
      .catch(err => console.log(err));

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data));
        history.push('/home');
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}));
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser());
        history.push('/');
      })
      .catch(err => console.log(err));

export const fetchPoints = (userId) =>
  dispatch =>
    axios.get( `/api/users/${userId}`)
      .then( res => {
        dispatch(addPoints( res.data ));
      })
      .catch(err => console.log(err));

export const fetchUserCardiomon = userId =>
  dispatch =>
    axios.get( `/api/users/${userId}/cardiomon`)
      .then( res => {
        dispatch(getUserCardiomon( res.data ));
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_POINTS:
      return Object.assign({}, state, { points: action.points });
    case GET_USER_CARDIOMON:
      return Object.assign({}, state, { userCardiomon: action.userCardiomon });
    default:
      return state
  }
}
