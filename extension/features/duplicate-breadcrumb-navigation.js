export default () => {
  const el = $('#app main.awsui-app-layout__content')
    .find('.awsui-app-layout__content--scrollable')
    .find('.awsui-util-mb-s')
    .find('nav.awsui-breadcrumb-group');

  // .find('.ssmCommon_breadcrumbContainer');
  const parent = $(el).parents('.awsui-util-mb-s');
  console.log(parent, el);

  // $(issues).addClass('ra-scc');
  // $($(issues).parents('section.widget-wrapper')).appendTo($(element));
  // $(element).prependTo($(parent));
  // const el = $('')
  // .find('.awsui-util-mb-s > awsui-breadcrumb-group');

  // console.log(el);

  // const parent = $(el).parent();
  // const sibling = $(parent).siblings('awsui-table');

  // $(parent).clone().insertAfter($(sibling));
  // , awsui-tabs
};
