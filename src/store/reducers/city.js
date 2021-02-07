import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
  search: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_SEARCH:
    return updateObject(state, {
      search: action.search,
    });
  default:
    return state;
  }
};

export default reducer;
