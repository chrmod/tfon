import Application from '@glimmer/application';
import Resolver, { BasicModuleRegistry } from '@glimmer/resolver';
import resolverConfiguration from '../glimmer-config/resolver-configuration';
import moduleMap from '../glimmer-config/module-map';

export default class App extends Application {
  constructor() {
    const moduleRegistry = new BasicModuleRegistry(moduleMap);
    const resolver = new Resolver(resolverConfiguration, moduleRegistry);

    super({
      rootName: resolverConfiguration.app.rootName,
      resolver
    });
  }
}
