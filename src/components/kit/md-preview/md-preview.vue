<template>
  <div class="markdown-body" :style="styles" v-html="articleHtml" v-highlight></div>
</template>

<script>
import marked from 'marked';
import highlight from 'highlight.js';

import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github-gist.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: true,
  headerPrefix: 'header-nav',
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
});

export default {
  name: 'MdPreview',
  props: {
    content: {
      type: String,
      default: '',
    },
    padding: {
      type: [String, Number],
      default: '10px',
    },
  },
  computed: {
    articleHtml() {
      const renderer = new marked.Renderer();
      let index = 0;
      renderer.heading = function(text, level) {
        return `<h${level} id="titleAnchor-${index++}">${text}</h${level}>`;
      };
      return marked(this.content || '', { renderer: renderer });
    },
    styles() {
      return {
        padding: typeof this.padding === 'number' ? `${this.padding}px` : this.padding,
      };
    },
  },
  directives: {
    highlight(el) {
      let blocks = el.querySelectorAll('pre code');
      blocks.forEach(block => {
        highlight.highlightBlock(block);
      });
    },
  },
};
</script>

<style lang="less">
.markdown-body p {
  text-align: justify;
}
</style>
