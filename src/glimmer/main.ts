import Application from '@glimmer/application';
import Resolver, { BasicModuleRegistry } from '@glimmer/resolver';
import resolverConfiguration from '../glimmer-config/resolver-configuration';
import moduleMap from '../glimmer-config/module-map';

export default class App extends Application {
  constructor() {
    const moduleRegistry = new BasicModuleRegistry(moduleMap);

    (<any>resolverConfiguration).types.services = {
      definitiveCollection: 'services',
    };
    (<any>resolverConfiguration).collections.services = {
      types: ['service'],
      defaultType: 'service',
      privateCollections: ['utils']
    };

    const resolver = new Resolver(resolverConfiguration, moduleRegistry);

    super({
      rootName: resolverConfiguration.app.rootName,
      resolver
    });
  }
}
