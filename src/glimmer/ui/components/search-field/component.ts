import Component from '@glimmer/component';
import * as Rx from 'rxjs';
import queryAction from '../../../../data/actions/query';

export default class extends Component {

  didInsertElement() {
    const el = <HTMLElement> this.element;
    const input = el.querySelector('input');

    input.focus();

    Rx.Observable.fromEvent(input, 'keyup')
      .debounceTime(100)
      .map((e: any) => e.target.value)
      .subscribe(queryAction);
  }
}
