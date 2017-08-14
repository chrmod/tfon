import Component, { tracked } from '@glimmer/component';
import getLogo from 'cliqz-logo-database';

export default class extends Component {

  @tracked('args')
  get logo() {
    const logo = getLogo(this.args.result.url);
    return logo;
  }

  @tracked('args')
  get classNames() {
    return this.args.result.selected ? 'selected' : '';
  }

}

