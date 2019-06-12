import Card from '@/components/base/card/';
import Icon from '@/components/base/icon/';

export default {
  name: 'CardTopic',
  components: {
    Card,
    Icon,
  },
  props: {
    topic: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  computed: {
    parentPath() {
      return this.$route.path.split('/')[1];
    },
  },
};
