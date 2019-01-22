export default () => {
  const el = $('#aws-console-logout');
  const parent = $(el).parent();

  $(el).addClass('nav-elt');
  $(el).addClass('ra-ssob');

  $(el).appendTo($('#nav-menu-right'));
  $(parent).hide();
};
