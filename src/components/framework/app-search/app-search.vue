<template>
  <div class="app-search-wrap">
    <input
      v-model="searchWord"
      ref="zSearch"
      class="app-search-input"
      id="searchInput"
      type="text"
      @click="handleClick"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @keyup.enter="handleEnter"
      @keyup.up="handleKeyupUp"
      @keyup.down="handleKeyupDown"
    />
    <button class="app-search-button" @click="requestSearchMovieFull">
      <Icon class="app-search-button-icon" type="tag" />
      <span class="app-search-button-text">搜索</span>
    </button>
    <div class="app-search-suggest" v-show="isShowOptions" ref="zSearchOptions">
      <router-link
        v-for="(item, index) in suggestList"
        :key="index"
        :to="{ path: `/movie/detail/${item.id}`, target: '_blank' }"
        :class="`app-search-suggest-item ${cursorIndex === index ? 'app-search-suggest-item-active' : ''}`"
        target="_blank"
        @mouseover="handleMouseoverOptionItem(index)"
      >
        <img class="app-search-suggest-item-poster" :src="item.img" alt="" />
        <div>
          <p class="app-search-suggest-item-title">{{ item.title }}（{{ item.year }}）</p>
          <p class="app-search-suggest-item-desc">{{ item.sub_title }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script src="./app-search.js"></script>

<style lang="less" scoped>
.app-search {
  &-wrap {
    position: relative;
  }
  &-input {
    width: 200px;
    height: 32px;
    padding: 0 75px 0 13px;
    font-size: 12px;
    color: @colorTextContent;
    border-radius: 100px;
    border: 1px solid @colorPrimary;
    outline: 0;
    background-color: transparent;
    transition: width 0.3s ease;
  }
  &-button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 65px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    // font-weight: bold;
    background-color: @colorPrimary;
    border: 0;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    outline: 0;
    &-icon {
      vertical-align: inherit;
      margin-right: 3px;
    }
    &-text {
    }
  }

  &-suggest {
    position: absolute;
    z-index: 999;
    top: 100%;
    left: 13px;
    right: 65px;
    background-color: #fff;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);

    &-item {
      display: block;
      padding: 6px;
      border: 1px solid @colorBorder;
      border-top: 0;
      overflow: hidden;
      zoom: 1;
      &-active {
        background-color: darken(@colorBg, 2%);
      }
      &:hover {
        background-color: darken(@colorBg, 1%);
      }

      &-poster {
        width: 40px;
        height: 58px;
        margin-right: 5px;
        float: left;
      }
      &-title {
        margin-right: 5px;
        color: @colorTextTitle;
        font-style: normal;
      }
      &-desc {
        display: block;
        margin-top: 3px;
      }
    }
  }
}
</style>
