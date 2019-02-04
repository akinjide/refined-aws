export default () => {
  const el = $('awsui-breadcrumb-group');
  const parent = $(el).parent();
  const sibling = $(parent).siblings('awsui-table');

  console.log(el);

  $(parent).clone().insertAfter($(sibling));
};

// , awsui-tabs
