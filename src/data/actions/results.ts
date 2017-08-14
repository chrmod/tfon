import store from '../store';

export function selectResult(result) {
  store.dispatch({
    type: 'SELECT_RESULT',
    payload: result,
  });
}
