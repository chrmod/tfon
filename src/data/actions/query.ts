import store from '../store';

export default function (query) {
  store.dispatch({
    type: 'QUERY',
    payload: query,
  });
}
