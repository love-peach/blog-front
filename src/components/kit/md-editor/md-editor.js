import marked from 'marked';
import hljs from 'highlight.js';
import Btn from '@/components/base/btn/';

import 'highlight.js/styles/monokai-sublime.css';
// import './github-markdown.css';

marked.setOptions({
  breaks: true,
  headerPrefix: 'header-nav',
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});

export default {
  name: 'md-editor',
  props: ['value'],
  components: {
    Btn,
  },
  data() {
    return {
      mdText: this.value || '',
      editorMode: 'liveMode',
    };
  },
  computed: {
    mdHtml() {
      return marked(this.mdText);
    },
  },
  directives: {
    highlight(el) {
      let blocks = el.querySelectorAll('pre code');
      blocks.forEach(block => {
        hljs.highlightBlock(block);
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.value) {
        this.mdText = this.value;
      }
    });
  },
  updated() {
    this.updateValue();
  },
  methods: {
    setEditorMode(mode) {
      this.editorMode = mode;
    },
    updateValue() {
      this.$emit('input', this.mdText);
    },
  },
  watch: {
    value(value) {
      this.mdText = value;
    },
  },
};
