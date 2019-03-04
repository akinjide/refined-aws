export default () => {
  const el = $('#nav-shortcutMenu');
  const parent = $(el).parent();
  const sibling = $(parent).find('#nav-menu-right');

  $(el).prependTo($(sibling));
};
