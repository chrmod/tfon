import Component from '@glimmer/component';
import * as Rx from 'rxjs';
import queryAction from '../../../../data/actions/query';

const SPECIAL_KEYS = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 91, 224];

export default class extends Component {

  didInsertElement() {
    const el = <HTMLElement> this.element;
    const input = el.querySelector('input');

    input.focus();

    Rx.Observable.fromEvent(input, 'keyup')
      .debounceTime(100)
      .filter((ev: any) => SPECIAL_KEYS.indexOf(ev.which) > -1 ? false : ev.key)
      .map((e: any) => e.target.value)
      .subscribe(queryAction);
  }
}
