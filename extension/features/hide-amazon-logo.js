export default () => {
  const parent = $('#nav-servicesMenu');
  const el = $('#nav-home-link');
  const sibling = $(el).siblings('.nav-menu-separator');

  $(parent).addClass('ra-hAL');
  $(el).addClass('ra-hAL');
  $(sibling).addClass('ra-hAL');

  $(el).hide();
  $(sibling).hide();
};
