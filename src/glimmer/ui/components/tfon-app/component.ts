import Component, { tracked } from '@glimmer/component';
import * as Rx from 'rxjs';

const searchUrl = (query) =>
  `http://api.cliqz.com/api/v2/results?country=de&q=${query}`;

export default class extends Component {

  @tracked value = '';
  @tracked results = [];

  didInsertElement() {
    const input = this.element;
    input.focus();

    Rx.Observable.fromEvent(input, 'keyup')
      .debounceTime(100)
      .map(e => e.target.value)
      .subscribe(this.updateValue.bind(this));
  }

  updateValue(value) {
    this.value = value;

    if (value) {
      this.updateResults(value)
    } else {
      this.results = [];
    }
  }

  async updateResults(query) {
    const url = searchUrl(query);
    const response = await fetch(url);
    const results = await response.json();
    this.results = results.results;
  }
}
