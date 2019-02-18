import {default as nS} from './common/nav-separator';

export default () => {
  const el = $('#console-nav-footer');
  const langSelector = $(el).find('#awsc-language-selector-content');
  const lang = $(el)
    .find('#footer-content')
    .find('#awsc-language-selector');

  $(lang).addClass('nav-elt ra-lsb');
  $(langSelector).addClass('ra-lsb');

  $(lang).appendTo($('#nav-menu-right'));
  $(langSelector).appendTo($('#consoleNavHeader > #awsgnav'));
  $(nS()).insertBefore(lang);
};
