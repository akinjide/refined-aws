import general from './groups/general';
import roleHistory from './groups/role-history';
import region from './groups/region';

import { defaultServices } from './groups/mappings';

export default (ctx, shortcutsContext, log) => {
  const CURRENT_URL = ctx.location.href;
  const BASE = 'console.aws.amazon.com';

  return [
    general(ctx, shortcutsContext, log),
    roleHistory(ctx, shortcutsContext, log),
    region(ctx, shortcutsContext, log),
    ...defaultServices(ctx, BASE, shortcutsContext, log),
  ];
};
