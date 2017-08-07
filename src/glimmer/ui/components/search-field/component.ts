import Component, { tracked } from '@glimmer/component';
import * as Rx from 'rxjs';

export default class extends Component {

  @tracked value = '';

  didInsertElement() {
    const el = <HTMLElement> this.element;
    const input = el.querySelector('input');
    input.focus();

    Rx.Observable.fromEvent(input, 'keyup')
      .debounceTime(100)
      .map((e: any) => e.target.value)
      .subscribe(v => this.onValue(v))
  }

  onValue(value) {
    this.value = value;
    this.args.onChange(value);
  }
}
