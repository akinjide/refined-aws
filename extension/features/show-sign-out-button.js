export default () => {
  const el = $('#aws-console-logout');
  const parent = $(el).parent();

  $(el).addClass('nav-elt');

  $(el).appendTo($('#nav-menu-right'));
  $(parent).hide();
}
