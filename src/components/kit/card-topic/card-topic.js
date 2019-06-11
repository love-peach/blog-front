import Card from '@/components/base/card/';
import Tag from '@/components/base/tag/';
import Icon from '@/components/base/icon/';

export default {
  name: 'CardTopic',
  components: {
    Card,
    Tag,
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
