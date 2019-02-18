import {default as nS} from './common/nav-separator';

export default () => {
  const el = $('#footer-content').find('#feedback');

  $(el).addClass('nav-elt ra-fb');

  $(el).appendTo($('#nav-menu-right'));
  $(nS()).insertBefore(el);
};
