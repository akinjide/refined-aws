export default () => {
  const el = $('#cc #application');
  const issues = $(el)
    .find('section.layout-support-dashboard')
    .find('section.widget-support-center-issues');
  const parent = $(issues).parents('.widget-layout');
  const element = $('<div class="col-xs-12"></div>');

  $(issues).addClass('ra-scc');

  $($(issues).parents('section.widget-wrapper')).appendTo($(element));
  $(element).prependTo($(parent));
};
