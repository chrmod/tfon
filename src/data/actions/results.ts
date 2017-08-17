import store from '../store';

export function selectResult(result) {
  store.dispatch({
    type: 'SELECT_RESULT',
    payload: result,
  });
}

export function nextResult() {
  store.dispatch({
    type: 'NEXT_RESULT'
  });
}

export function prevResult() {
  store.dispatch({
    type: 'PREV_RESULT'
  });
}
