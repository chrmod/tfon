import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import defaultState from './default-state';

export default class Store {
  static create() {
    return createStore(
      reducer,
      defaultState,
      compose(
        applyMiddleware(thunk),
        (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__(),
      )
    );
  }
}
