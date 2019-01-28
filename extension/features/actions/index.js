import general from './groups/general';
import roleHistory from './groups/role-history';

import compute from './groups/compute';
import storage from './groups/storage';
import database from './groups/database';
import networkingContentDelivery from './groups/networking-and-content-delivery';
import developerTools from './groups/developer-tools';
import managementGovernance from './groups/management-and-governance';
import applicationIntegration from './groups/application-integration';
import securityIdentityCompliance from './groups/security-identity-and-compliance';
import customerEngagement from './groups/customer-engagement';

export default (ctx, shortcutsContext, log) => {
  const uri = ctx.location.href;
  const regx = /\.com\/.+\/home/;

  return [
    general(ctx, shortcutsContext, log),
    roleHistory(ctx, shortcutsContext, log),
    compute(ctx, uri, regx, shortcutsContext, log),
    storage(ctx, uri, regx, shortcutsContext, log),
    database(ctx, uri, regx, shortcutsContext, log),
    networkingContentDelivery(ctx, uri, regx, shortcutsContext, log),
    developerTools(ctx, uri, regx, shortcutsContext, log),
    managementGovernance(ctx, uri, regx, shortcutsContext, log),
    applicationIntegration(ctx, uri, regx, shortcutsContext, log),
    securityIdentityCompliance(ctx, uri, regx, shortcutsContext, log),
    customerEngagement(ctx, uri, regx, shortcutsContext, log),
  ];
};
