export default () => {
  const el = $('header#awsc-nav-header div[data-testid="awsc-nav-more-menu-list"] ul#awsc-navigation__more-menu--list');
  const support = $(el).find('button[data-testid="more-menu__awsc-nav-support-menu-button"]');

  $(support).hide();
};
