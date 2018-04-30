import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_SINGLE_CARDIOMON = 'GET_SINGLE_CARDIOMON';

/**
 * ACTION CREATORS
 */
const getSingleCardiomon = cardiomon => ({ type: GET_SINGLE_CARDIOMON, cardiomon });

/**
 * THUNK CREATORS
 */
export const fetchSingleCardiomon = id => {
  return dispatch =>
    axios
      .get(`/api/cardiomon/${id}`)
      .then(res => {
        dispatch(getSingleCardiomon(res.data));
      })
      .catch(err => console.log(err));
};

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_CARDIOMON:
      return action.cardiomon;
    default:
      return state;
  }
}
