import Component, { tracked } from '@glimmer/component';
import store, { defaultState } from '../../../../data/store';

export default class extends Component {

  @tracked state = defaultState;

  didInsertElement() {
    store.subscribe(() => {
      this.state = store.getState();
    });
  }
}
