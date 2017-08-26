import Component, { tracked } from '@glimmer/component';
import getLogo from 'cliqz-logo-database';

export default class extends Component {

  @tracked('args')
  get logo() {
    const logo = getLogo(this.args.url);
    return logo;
  }

  @tracked('args') get classNames() {
    return this.args.selected ? 'selected' : '';
  }

  @tracked('args') get deepResults() {
    const results = this.args.deepResults || [];
    const r = results.filter(r => r.type === 'images')[0] || { links: [] };

    console.log(r);
    return r.links;
  }

}

