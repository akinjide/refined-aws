export default () => {
  const header = $('header#awsc-nav-header');
  const recent = $(header).find('div[data-testid="awsc-nav-service-menu"] div[data-testid="recently-visited-container"]');

  $(recent).clone().appendTo($('#h'));

  const child = $('#h #consoleNavHeader+div[data-testid="recently-visited-container"]');

  $(child).addClass('ui-widget-content ra-dh');
  $(child).attr('id', 'ra-draggable');
  $('#ra-draggable').draggable({ cursor: 'move', opacity: 0.7 });
};
