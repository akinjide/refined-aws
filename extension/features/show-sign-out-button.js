export default () => {
  const el = $('header#awsc-nav-header div[data-testid="awsc-nav-more-menu-list"] ul#awsc-navigation__more-menu--list');
  const signout = $(el).find('div[data-testid="awsc-nav-account-menu-content"] a#aws-console-logout');
  const parent = $(signout).parent();

  $(signout).parent().parent().hide();
  $(parent).addClass('ra-ssob');
  $(parent).appendTo($(el));
};
