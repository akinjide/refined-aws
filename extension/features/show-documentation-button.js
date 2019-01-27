import {default as nS} from './common/nav-separator';

export default () => {
  const el = $('#aws-documentation');

  $(el).addClass('nav-elt');
  $(el).addClass('ra-sdb');

  $(el).appendTo($('#nav-menu-right'));
  $(nS()).insertBefore(el);
};
