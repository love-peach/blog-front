import Icon from '@/components/base/icon/';
import Tag from '@/components/base/tag/';

export default {
  name: 'ZSelect',
  components: {
    Icon,
    Tag,
  },
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    id: String,
    name: String,
    placeholder: String,
    multiple: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      prefixCls: 'z-select',
      isShowOptions: false,
      selectedArray: [],
      cursorIndex: 0,
    };
  },
  computed: {
    selectedLabel() {
      return this.selectedArray.map(item => item[this.labelKey]).join(',');
    },
    selectedValue() {
      return this.selectedArray.map(item => item[this.valueKey]);
    },
  },

  updated() {
    this.updateValue();
  },
  methods: {
    /**
     * @desc 将值发射给 v-model 绑定的值
     */
    updateValue() {
      this.$emit('input', this.selectedValue);
    },

    /**
     * @desc 选择 option
     */
    handleSelect(option) {
      if (this.multiple) {
        this.handleSelectMultiple(option);
      } else {
        this.handleSelectSingle(option);
        this.handleHideOptions();
      }
    },

    /**
     * @desc 选择 option 单选
     */
    handleSelectSingle(option) {
      if (this.includeSomeValue(option, this.selectedArray)) {
        this.selectedArray = [];
      } else {
        this.selectedArray = [option];
      }
    },

    /**
     * @desc 选择 option 单选
     */
    handleSelectMultiple(option) {
      if (this.includeSomeValue(option, this.selectedArray)) {
        this.removeSomeValue(option, this.selectedArray);
      } else {
        this.selectedArray.push(option);
      }
    },

    /**
     * @desc 判断 val 是否 在 values 中
     */
    includeSomeValue(val, values) {
      return values.some(item => item._id === val._id);
    },

    /**
     * @desc 从 values 移除 val
     */
    removeSomeValue(val, values) {
      let rmIndex = -1;
      values.forEach((item, index) => {
        if (item._id === val._id) {
          rmIndex = index;
        }
      });
      if (rmIndex !== -1) {
        values.splice(rmIndex, 1);
      }
    },

    /**
     * @desc 点击 select 组件
     */
    handleClick() {
      this.handleShowOptions();
    },

    /**
     * @desc 聚焦事件
     */
    handleFocus() {
      this.handleShowOptions();
    },

    /**
     * @desc 失焦事件
     */
    handleBlur() {
      this.handleHideOptions();
    },

    handleEnter() {
      if (this.isShowOptions) {
        this.handleSelect(this.options[this.cursorIndex]);
      } else {
        this.handleHideOptions();
      }
    },

    handleKeyupUp() {
      if (this.cursorIndex <= 0) {
        this.cursorIndex = this.options.length - 1;
      } else {
        this.cursorIndex -= 1;
      }
      this.makeOptionItemVisable();
    },

    handleKeyupDown() {
      if (this.cursorIndex >= this.options.length - 1) {
        this.cursorIndex = 0;
      } else {
        this.cursorIndex += 1;
      }
      this.makeOptionItemVisable();
    },

    handleMouseoverOptionItem(index) {
      this.cursorIndex = index;
    },

    makeOptionItemVisable() {
      const optionsUl = this.$refs.zSelectOptions;
      const optionsUlHeight = optionsUl.clientHeight;
      const optionsUlScrollTop = optionsUl.scrollTop;
      const optionsUlItem = optionsUl.getElementsByTagName('li')[this.cursorIndex];
      const optionsUlItemHeight = optionsUlItem.clientHeight;
      const optionsUlItemOffsetTop = optionsUlItem.offsetTop;

      if (optionsUlScrollTop <= optionsUlItemOffsetTop && optionsUlItemOffsetTop + optionsUlItemHeight <= optionsUlScrollTop + optionsUlHeight) {
        // 在 options 盒子里可见
      } else {
        optionsUl.scrollTop = optionsUlItemOffsetTop;
      }
    },

    /**
     * @desc 显示 options
     */
    handleShowOptions() {
      this.isShowOptions = true;
    },

    /**
     * @desc 隐藏 options
     */
    handleHideOptions() {
      this.isShowOptions = false;
      this.$refs.zSelect.blur();
      this.cursorIndex = 0;
    },
  },
};
