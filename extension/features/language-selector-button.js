import {default as nS} from './common/nav-separator';

export default () => {
  const el = $('#footer-content').find('#awsc-language-selector');

  $(el).addClass('nav-elt');
  $(el).addClass('ra-lsb');

  $(el).appendTo($('#nav-menu-right'));
  $(nS()).insertBefore(el);
};
