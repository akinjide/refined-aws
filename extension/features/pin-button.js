export default () => {
  const header = $('header#awsc-nav-header');
  const favorites = $(header).find('div[data-testid="awsc-nav-service-menu"] div[data-testid="favorites-container"]');
  const parent = $(header).parent();
  const recent = $(header).find('div[data-testid="awsc-nav-service-menu"] div[data-testid="awsc-nav-recently-visited-list"]');
  const sibling = $(recent).siblings();

  recent.css({ 'margin-top': 0 });
  $(sibling).hide();
  $(favorites).addClass('ra-pb');
  $(favorites).appendTo(parent);
};
