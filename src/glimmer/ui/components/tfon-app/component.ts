import Component, { tracked } from '@glimmer/component';

const searchUrl = (query) =>
  `http://api.cliqz.com/api/v2/results?country=de&q=${query}`;

export default class extends Component {

  @tracked results = [];

  updateValue(value) {
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
