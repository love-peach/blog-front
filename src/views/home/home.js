import BillBoard from '@/components/kit/billboard/';
import RotatingText from '@/components/kit/rotating-text';
import ZPanel from '@/components/base/panel/';
import Btn from '@/components/base/btn/';
import Icon from '@/components/base/icon/';
import SectionCard from './components/section-card.vue';
import SectionTitle from './components/section-title.vue';
import SectionTimeline from './components/section-timeline.vue';
import banneImg from './img/banner.jpg';
import demoImg from './img/demo1.jpg';
import demoImg2 from './img/demo2.jpg';
import demoImg3 from './img/demo3.png';
import demoImg4 from './img/demo4.png';

export default {
  name: 'HomePage',
  components: {
    BillBoard,
    RotatingText,
    ZPanel,
    Btn,
    Icon,
    SectionCard,
    SectionTitle,
    SectionTimeline,
  },
  data() {
    return {
      banneImg,
      poster: demoImg,
      poster2: demoImg2,
      poster3: demoImg3,
      poster4: demoImg4,
      words: [
        {
          label: '精致',
          color: '#2d8cf0',
        },
        {
          label: '优雅',
          color: '#2db7f5',
        },
        {
          label: '极致',
          color: '#19be6b',
        },
        {
          label: '快乐',
          color: '#ff9900',
        },
      ],
      words2: [
        {
          label: 'delicate',
          color: '#2d8cf0',
        },
        {
          label: 'elegant',
          color: '#2db7f5',
        },
        {
          label: 'acme',
          color: '#19be6b',
        },
        {
          label: 'happy',
          color: '#ff9900',
        },
      ],
      times: [
        {
          datearea: '2018.07 - 至今',
          title: '随行付金融科技有限公司',
          desc:
            '是中国线下场景智慧支付领导者，是国内为数不多的全牌照支付公司。任职期间，主要负责公司核心业务反欺诈系统系统的搭建，开发，维护和部署一整套流程。同时，负责开发公司核心产品 还到 app 组件库的开发，并发布到 npm。',
        },
        {
          datearea: '2017.04 - 2018.06',
          title: '联想利泰北京有限公司',
          desc: '是联想集团的成员企业。任职期间，主要负责搭建后台管理系统，并积极参与项目业务逻辑的开发。另外，负责开发内嵌联想电脑管家的爱奇艺 Web 应用。',
        },
        {
          datearea: '2016.05 - 2017.03',
          title: '全聚德小鸭哥有限公司',
          desc: '是一家互联网餐饮企业。任职期间，主要负责维护智慧餐厅管理后台，同时也参与了公司在微信端的点餐系统的开发。',
        },
        {
          datearea: '2015.08 - 2016.03',
          title: '易清互动科技有限公司',
          desc: '是一家为中小微企业提供知识产权管理运用的综合平台。任职期间，负责维护企业官网和在线申请页面。',
        },
      ],
    };
  },
};
