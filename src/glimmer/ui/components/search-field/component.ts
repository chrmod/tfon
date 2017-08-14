import Component, { tracked } from '@glimmer/component';
import * as Rx from 'rxjs';
import store from '../../../../data/store';

export default class extends Component {

  @tracked value = '';

  didInsertElement() {
    const el = <HTMLElement> this.element;
    const input = el.querySelector('input');
    input.focus();

    store.subscribe(() => {
      this.value = store.getState().query;
    });

    Rx.Observable.fromEvent(input, 'keyup')
      .debounceTime(100)
      .map((e: any) => e.target.value)
      .subscribe(v => store.dispatch({
        type: 'QUERY',
        payload: v,
      }));
  }
}
