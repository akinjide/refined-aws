import general from './groups/general';
import roleHistory from './groups/role-history';
import regions from './groups/regions';
import {defaultServices} from './groups/services';

const baseURL = 'console.aws.amazon.com';

export default (ctx, shortcutsContext, log) => [
  general(ctx, baseURL, shortcutsContext, log),
  roleHistory(ctx, shortcutsContext, log),
  regions(ctx, shortcutsContext, log),
  ...defaultServices(ctx, baseURL, shortcutsContext, log),
];
