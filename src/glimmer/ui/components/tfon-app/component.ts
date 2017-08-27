import * as Rx from 'rxjs';
import Component, { tracked } from '@glimmer/component';
import defaultState from '../../../../store/default-state';
import { selectResult, nextResult, prevResult } from '../../../../store/actions/results';

const upDownKeys = ['ArrowUp', 'ArrowDown'];

export default class extends Component {

  @tracked state = defaultState;

  didInsertElement() {
    this.store.subscribe(() => {
      this.state = this.store.getState();
    });

    const app = <HTMLElement> this.element;

    Rx.Observable.fromEvent(app, 'mousemove')
      .map((e: any) => e.target.closest('.result'))
      // TODO: something is wrong here, if debunce is set the view update with unexpected delay
      .filter(r => r)
      .map(
        el => this.state.results.find(r => r.url === el.getAttribute('href')))
      .subscribe((result) => this.store.dispatch(selectResult(result)));

    Rx.Observable.fromEvent(window, 'keyup')
      .debounceTime(100)
      .filter((e: any) => upDownKeys.indexOf(e.key) >= 0)
      .subscribe((e) => {
        if (e.key === 'ArrowUp') {
          this.store.dispatch(prevResult());
        } else if (e.key === 'ArrowDown') {
          this.store.dispatch(nextResult());
        }
      });
  }
}
