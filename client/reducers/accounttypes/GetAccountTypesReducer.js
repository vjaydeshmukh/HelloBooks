import {
  GET_ACCOUNTTYPES
} from '../../helpers/Constants';

const initialState = [{
  message: '',
  list: [],
  count: 0
}];

/**
 * GetAccountTypesReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Array} description
 */
const GetAccountTypesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ACCOUNTTYPES:
    return [{
      message: action.payload.message,
      list: action.payload.accounttype.rows,
      count: action.payload.accounttype.count
    }, ...state];

  default:
    return state;
  }
};

export default GetAccountTypesReducer;
