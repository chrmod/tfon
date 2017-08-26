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

  if (action.type === 'SELECT_RESULT') {
    return {
      ...state,
      results: [
        ...state.results.map(r => ({
          ...r,
          selected: action.payload === r,
        })),
      ]
    };
  }

  if (action.type === 'NEXT_RESULT') {
    const currentResultIndex = state.results.findIndex(r => r.selected || false);
    return {
      ...state,
      results: [
        ...state.results.map((r, i) => ({
          ...r,
          selected: i === (currentResultIndex + 1),
        }))
      ]
    };
  }

  if (action.type === 'PREV_RESULT') {
    const currentResultIndex = state.results.findIndex(r => r.selected);
    let nextIndex = currentResultIndex - 1;

    if (nextIndex < -1) {
      nextIndex = state.results.length - 1;
    }

    return {
      ...state,
      results: [
        ...state.results.map((r, i) => ({
          ...r,
          selected: nextIndex === i,
        }))
      ]
    };
  }

  return state;
};

export const defaultState = {
  query: '',
  results: [],
  selectedIndex: 0,
}

const store = createStore(
  reducer,
  defaultState,
  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
