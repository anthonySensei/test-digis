import * as actionTypes from './actionTypes';

export const setSearch = search => {
  return {
    type: actionTypes.SET_SEARCH,
    search
  };
};
