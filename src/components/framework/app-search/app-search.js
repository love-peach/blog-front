import Icon from '@/components/base/icon/';
import doubanApi from '@/api/api-douban';

let timer = null;

export default {
  name: 'AppSearch',
  components: {
    Icon,
  },
  data() {
    return {
      searchWord: '',
      suggestList: [],
      isShowOptions: false,
      cursorIndex: 0,
    };
  },
  methods: {
    /**
     * @desc 请求搜索结果
     */
    requestSearchMovie() {
      var params = {
        q: this.searchWord,
      };
      doubanApi
        .DoubanMovieSearch(params)
        .then(res => {
          this.suggestList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * @desc 请求搜索结果
     */
    requestSearchMovieFull() {
      var params = {
        q: this.searchWord,
      };
      doubanApi
        .DoubanMovieSearchFull(params)
        .then(res => {
          console.log(res, 'res');
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * @desc 选择 option
     */
    handleSelect(option) {
      console.log(option, 'option');
      this.$router.push({ path: `/movie/detail/${option.id}` });
      this.handleHideOptions();
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
      setTimeout(() => {
        this.handleHideOptions();
      }, 100);
    },

    /**
     * @desc input 事件
     */
    handleInput() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.requestSearchMovie();
      }, 300);
    },

    /**
     * @desc 回车事件
     */
    handleEnter() {
      if (this.isShowOptions) {
        this.handleSelect(this.suggestList[this.cursorIndex]);
      } else {
        this.handleHideOptions();
      }
    },

    /**
     * @desc 键盘 上 事件
     */
    handleKeyupUp() {
      if (this.cursorIndex <= 0) {
        this.cursorIndex = this.suggestList.length - 1;
      } else {
        this.cursorIndex -= 1;
      }
      this.makeOptionItemVisable();
    },

    /**
     * @desc 键盘 下 事件
     */
    handleKeyupDown() {
      if (this.cursorIndex >= this.suggestList.length - 1) {
        this.cursorIndex = 0;
      } else {
        this.cursorIndex += 1;
      }
      this.makeOptionItemVisable();
    },

    handleMouseoverOptionItem(index) {
      this.cursorIndex = index;
    },

    /**
     * @desc 让选项在固定高度盒子中 可见
     */
    makeOptionItemVisable() {
      const optionsUl = this.$refs.zSearchOptions;
      const optionsUlHeight = optionsUl.clientHeight;
      const optionsUlScrollTop = optionsUl.scrollTop;
      const optionsUlItem = optionsUl.getElementsByTagName('li')[this.cursorIndex];
      const optionsUlItemHeight = optionsUlItem.clientHeight;
      const optionsUlItemOffsetTop = optionsUlItem.offsetTop;

      if (optionsUlScrollTop <= optionsUlItemOffsetTop && optionsUlItemOffsetTop + optionsUlItemHeight <= optionsUlScrollTop + optionsUlHeight) {
        // 在 suggestList 盒子里可见
      } else {
        optionsUl.scrollTop = optionsUlItemOffsetTop;
      }
    },

    /**
     * @desc 显示 suggestList
     */
    handleShowOptions() {
      this.isShowOptions = true;
    },

    /**
     * @desc 隐藏 suggestList
     */
    handleHideOptions() {
      this.isShowOptions = false;
      this.$refs.zSearch.blur();
      this.cursorIndex = 0;
    },
  },
};
