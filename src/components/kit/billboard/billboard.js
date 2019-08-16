import { throttle } from '@/utils/tools';

export default {
  name: 'billboard',
  data() {
    return {
      bgPosition: 0,
    };
  },
  computed: {
    bgSrc() {
      return 'https://picsum.photos/1280/240?image=' + this.getDate();
    },
  },
  mounted() {
    const vm = this;
    this.throttleScroll = throttle(function() {
      vm.scrollHandler();
    }, 0);
    window.addEventListener('scroll', this.throttleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttleScroll);
  },
  methods: {
    scrollHandler() {
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      this.bgPosition = t;
    },
    getDate() {
      const now = new Date();
      return `${now.getMonth()}${now.getDate()}`;
    },
    getRandomNumberByRange(start, end) {
      return Math.round(Math.random() * (end - start) + start);
    },
  },
};
