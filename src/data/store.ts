import { createStore } from 'redux';

const searchUrl = (query) =>
  `http://api.cliqz.com/api/v2/results?country=de&q=${query}`;

const updateResults = async (query) => {
  const url = searchUrl(query);
  const response = await fetch(url);
  const results = await response.json();
  store.dispatch({
    type: 'RESULTS',
    payload: results.results,
  })
}

const reducer = (state, action) => {
  if (action.type === 'QUERY') {
    if (action.payload) {
      updateResults(action.payload);
      return {
        ...state,
        query: action.payload,
      };
    } else {
      return {
        ...state,
        query: '',
        results: [],
      };
    }
  }

  if (action.type === 'RESULTS') {
    return {
      ...state,
      results: action.payload,
    };
  }

  return state;
};

export const defaultState = {
  query: '',
  results: [],
}

const store = createStore(
  reducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
