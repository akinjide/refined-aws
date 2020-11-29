export default () => {
  const el = $('header#awsc-nav-header div[data-testid="awsc-nav-more-menu-list"] ul#awsc-navigation__more-menu--list');
  const regions = $(el).find('button[data-testid="more-menu__awsc-nav-regions-menu-button"]');

  $(regions).hide();
};
