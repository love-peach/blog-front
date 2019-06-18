<template>
  <div class="md-preview-box markdown-body" v-html="articleHtml" v-highlight></div>
</template>

<script>
import marked from 'marked';
import highlight from 'highlight.js';

import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/monokai-sublime.css';

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
.md-preview-box {
  padding: 10px;
}

.markdown-body pre {
  background: #23241f !important;
  border-radius: 0 !important;
  margin-left: -10px;
  margin-right: -10px;
}
</style>
