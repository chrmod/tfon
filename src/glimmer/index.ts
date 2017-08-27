import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import Store from '../store/store';

const app = new App();

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`services:/${app.rootName}/store/main`, Store);
    registry.registerInjection('component', 'store', `services:/${app.rootName}/store/main`);
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

app.renderComponent('tfon-app', document.body, null);

app.boot();
