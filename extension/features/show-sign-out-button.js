import nS from './common/nav-separator';

export default () => {
  const el = $('#aws-console-logout');
  const parent = $(el).parent();

  $(el).addClass('nav-elt ra-ssob');

  $(el).appendTo($('#nav-menu-right'));
  $(nS()).insertBefore(el);
  $(parent).hide();
};
