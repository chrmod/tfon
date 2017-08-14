import Component, { tracked } from '@glimmer/component';
import store from '../../../../data/store';

export default class extends Component {

  @tracked results = [];

  didInsertElement() {
    store.subscribe(() => {
      this.results = store.getState().results;
    });
  }
}
