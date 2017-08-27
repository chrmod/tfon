import Component from '@glimmer/component';
import * as Rx from 'rxjs';
import queryAction from '../../../../store/actions/query';

const SPECIAL_KEYS = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 91, 224];

export default class extends Component {

  get input() {
    const el = <HTMLElement> this.element;
    return el.querySelector('input');
  }

  didInsertElement() {
    this.updateInput();

    Rx.Observable.fromEvent(this.input, 'keyup')
      .debounceTime(100)
      .filter((ev: any) => SPECIAL_KEYS.indexOf(ev.which) > -1 ? false : ev.key)
      .map((e: any) => e.target.value)
      .subscribe((query) => this.store.dispatch(queryAction(query)));
  }

  didUpdate() {
    this.updateInput();
  }

  updateInput() {
    if (this.args.isFocused) {
      this.input.focus();
    } else {
      this.input.blur();
    }
  }
}
