const iViewComponent = [
  {
    name: 'Button',
    component: () => import(/* webpackChunkName: 'iviewButton' */ 'iview/src/components/button/'),
  },
  {
    name: 'Message',
    component: () => import(/* webpackChunkName: 'iviewMessage' */ 'iview/src/components/message/'),
  },
  {
    name: 'Notice',
    component: () => import(/* webpackChunkName: 'iviewNotice' */ 'iview/src/components/notice/'),
  },
  {
    name: 'Input',
    component: () => import(/* webpackChunkName: 'iviewInput' */ 'iview/src/components/input/'),
  },
  {
    name: 'Modal',
    component: () => import(/* webpackChunkName: 'iviewModal' */ 'iview/src/components/modal/'),
  },
  {
    name: 'Menu',
    component: () => import(/* webpackChunkName: 'iviewMenu' */ 'iview/src/components/menu/'),
  },
  {
    name: 'Upload',
    component: () => import(/* webpackChunkName: 'iviewUpload' */ 'iview/src/components/upload/'),
  },
  {
    name: 'Table',
    component: () => import(/* webpackChunkName: 'iviewTable' */ 'iview/src/components/table/'),
  },
  {
    name: 'Drawer',
    component: () => import(/* webpackChunkName: 'iviewDrawer' */ 'iview/src/components/drawer/'),
  },
  {
    name: 'Divider',
    component: () => import(/* webpackChunkName: 'iviewDivider' */ 'iview/src/components/divider/'),
  },
  {
    name: 'Page',
    component: () => import(/* webpackChunkName: 'iviewPage' */ 'iview/src/components/page/'),
  },
  {
    name: 'Row',
    component: () => import(/* webpackChunkName: 'iviewRow' */ 'iview/src/components/row/'),
  },
  {
    name: 'Col',
    component: () => import(/* webpackChunkName: 'iviewCol' */ 'iview/src/components/col/'),
  },
  {
    name: 'Icon',
    component: () => import(/* webpackChunkName: 'iviewIcon' */ 'iview/src/components/icon/'),
  },
  {
    name: 'Select',
    component: () => import(/* webpackChunkName: 'iviewSelect' */ 'iview/src/components/select/'),
  },
  {
    name: 'Option',
    component: () => import(/* webpackChunkName: 'iviewOption' */ 'iview/src/components/option/'),
  },
  {
    name: 'Submenu',
    component: () => import(/* webpackChunkName: 'iviewSubmenu' */ 'iview/src/components/submenu/'),
  },
  {
    name: 'MenuItem',
    component: () => import(/* webpackChunkName: 'iviewMenuItem' */ 'iview/src/components/menu-item/'),
  },
  {
    name: 'DatePicker',
    component: () => import(/* webpackChunkName: 'iviewDatePicker' */ 'iview/src/components/date-picker/'),
  },
  {
    name: 'IForm',
    component: () => import(/* webpackChunkName: 'iViewFormIForm' */ 'iview/src/components/form/'),
  },
  {
    name: 'FormItem',
    component: () => import(/* webpackChunkName: 'iviewFormItem' */ 'iview/src/components/form-item/'),
  },
  {
    name: 'Breadcrumb',
    component: () => import(/* webpackChunkName: 'iviewBreadcrumb' */ 'iview/src/components/breadcrumb/'),
  },
  {
    name: 'BreadcrumbItem',
    component: () => import(/* webpackChunkName: 'iviewBreadcrumbItem' */ 'iview/src/components/breadcrumb-item/'),
  },
  {
    name: 'Dropdown',
    component: () => import(/* webpackChunkName: 'iviewDropdown' */ 'iview/src/components/dropdown/'),
  },
  {
    name: 'DropdownMenu',
    component: () => import(/* webpackChunkName: 'iviewDropdownMenu' */ 'iview/src/components/dropdown-menu/'),
  },
  {
    name: 'DropdownItem',
    component: () => import(/* webpackChunkName: 'iviewDropdownItem' */ 'iview/src/components/dropdown-item/'),
  },
  {
    name: 'Tooltip',
    component: () => import(/* webpackChunkName: 'iviewTooltip' */ 'iview/src/components/tooltip/'),
  },
  {
    name: 'Tag',
    component: () => import(/* webpackChunkName: 'iviewTag' */ 'iview/src/components/tag/'),
  },
  {
    name: 'Tabs',
    component: () => import(/* webpackChunkName: 'iviewTabs' */ 'iview/src/components/tabs/'),
  },
  {
    name: 'TabPane',
    component: () => import(/* webpackChunkName: 'iviewTabPane' */ 'iview/src/components/tab-pane/'),
  },
  {
    name: 'Checkbox',
    component: () => import(/* webpackChunkName: 'iviewCheckbox' */ 'iview/src/components/checkbox/'),
  },
  {
    name: 'CheckboxGroup',
    component: () => import(/* webpackChunkName: 'iviewCheckboxGroup' */ 'iview/src/components/checkbox-group/'),
  },
  {
    name: 'Radio',
    component: () => import(/* webpackChunkName: 'iviewRadio' */ 'iview/src/components/radio/'),
  },
  {
    name: 'RadioGroup',
    component: () => import(/* webpackChunkName: 'iviewRadioGroup' */ 'iview/src/components/radio-group/'),
  },
  {
    name: 'ISwitch',
    component: () => import(/* webpackChunkName: 'iviewSwitch' */ 'iview/src/components/switch/'),
  },
  {
    name: 'Timeline',
    component: () => import(/* webpackChunkName: 'iviewTimeline' */ 'iview/src/components/timeline/'),
  },
  {
    name: 'TimelineItem',
    component: () => import(/* webpackChunkName: 'iviewTimelineItem' */ 'iview/src/components/timeline-item/'),
  },
  {
    name: 'Alert',
    component: () => import(/* webpackChunkName: 'iviewAlert' */ 'iview/src/components/alert/'),
  },
  {
    name: 'ICircle',
    component: () => import(/* webpackChunkName: 'iviewCircle' */ 'iview/src/components/circle/'),
  },
  {
    name: 'Poptip',
    component: () => import(/* webpackChunkName: 'iviewPoptip' */ 'iview/src/components/poptip/'),
  },
  {
    name: 'Card',
    component: () => import(/* webpackChunkName: 'iviewCard' */ 'iview/src/components/card/'),
  },
  {
    name: 'Spin',
    component: () => import(/* webpackChunkName: 'iviewSpin' */ 'iview/src/components/spin/'),
  },
  {
    name: 'Progress',
    component: () => import(/* webpackChunkName: 'iviewProgress' */ 'iview/src/components/progress/'),
  },
  {
    name: 'Cascader',
    component: () => import(/* webpackChunkName: 'iviewCascader' */ 'iview/src/components/cascader/'),
  },
  {
    name: 'Split',
    component: () => import(/* webpackChunkName: 'iviewSplit' */ 'iview/src/components/split'),
  },
  {
    name: 'ButtonGroup',
    component: () => import(/* webpackChunkName: 'iviewSplit' */ 'iview/src/components/button-group/'),
  },
  {
    name: 'TimePicker',
    component: () => import(/* webpackChunkName: 'iviewTimePicker' */ 'iview/src/components/time-picker/'),
  },
];

iViewComponent.forEach(item => {
  Vue.component(item.name, item.component);
});
