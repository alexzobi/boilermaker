import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CARDIOMON = 'GET_CARDIOMON';

/**
 * ACTION CREATORS
 */
const getCardiomon = cardiomon => ({ type: GET_CARDIOMON, cardiomon });

/**
 * THUNK CREATORS
 */
export const fetchCardiomon = () => dispatch =>
  axios
    .get('/api/cardiomon')
    .then(res => dispatch(getCardiomon(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_CARDIOMON:
      return action.cardiomon;
    default:
      return state;
  }
}
