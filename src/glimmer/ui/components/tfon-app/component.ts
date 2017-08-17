import * as Rx from 'rxjs';
import Component, { tracked } from '@glimmer/component';
import store, { defaultState } from '../../../../data/store';
import { selectResult, nextResult, prevResult } from '../../../../data/actions/results';

const upDownKeys = ['ArrowUp', 'ArrowDown'];

export default class extends Component {

  @tracked state = defaultState;

  didInsertElement() {
    store.subscribe(() => {
      this.state = store.getState();
    });

    Rx.Observable.fromEvent(this.element, 'mousemove')
      .map((e: any) => e.target.closest('.result'))
      // TODO: something is wrong here, if debunce is set the view update with unexpected delay
      .filter(r => r)
      .map(
        el => this.state.results.find(r => r.url === el.getAttribute('href')))
      .subscribe(selectResult);

    Rx.Observable.fromEvent(window, 'keyup')
      .debounceTime(100)
      .filter((e: any) => upDownKeys.indexOf(e.key) >= 0)
      .subscribe((e) => {
        if (e.key === 'ArrowUp') {
          prevResult();
        } else if (e.key === 'ArrowDown') {
          nextResult();
        }
      });
  }
}
