import general from './groups/general';
import roleHistory from './groups/role-history';
import regions from './groups/regions';
import {services} from './groups/services';

export default (ctx, config, shortcutsContext, log) => [
  general(ctx, config, shortcutsContext, log),
  roleHistory(ctx, shortcutsContext, log),
  regions(ctx, shortcutsContext, log),
  ...services(ctx, config, shortcutsContext, log),
];
