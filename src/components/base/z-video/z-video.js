import Icon from '@/components/base/icon/';
import ZProgress from '@/components/base/z-progress';

export default {
  name: 'ZVideo',
  components: {
    Icon,
    ZProgress,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
    poster: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isReadyPlay: false,
      isPlaying: false,
      isMute: false,
      isFullScreen: false,
      volume: 1,
      volumeOld: 1,
      currentTime: 1,
      videoDuration: 1,
      controlCurrentTime: '0:0',
    };
  },
  computed: {
    videoUrl() {
      return '';
    },
  },
  mounted() {
    this.videoPlayer = document.getElementById('videoPlayer');
    const that = this;
    this.videoPlayer.onloadedmetadata = function() {
      that.videoDuration = this.duration;
      that.isReadyPlay = true;
    };
    this.videoPlayer.ontimeupdate = function() {
      that.currentTime = this.currentTime / that.videoDuration;
    };
  },
  watch: {
    isPlaying(value) {
      if (value) {
        this.videoPlayer.play();
      } else {
        this.videoPlayer.pause();
      }
    },
    isMute(value) {
      if (value) {
        this.volumeOld = this.videoPlayer.volume;
        this.videoPlayer.volume = 0;
        this.volume = 0;
      } else {
        this.videoPlayer.volume = this.volumeOld;
        this.volume = this.volumeOld;
      }
    },
  },
  methods: {
    handleChangeProgress(value) {
      this.videoPlayer.currentTime = this.videoDuration * value;
    },
    handleChangeVolume(value) {
      this.volume = value;
      this.volumeOld = value;
      this.videoPlayer.volume = value;
      this.isMute = value <= 0;
    },
    /**
     * @desc 切换播放
     */
    handleTogglePlay() {
      this.isPlaying = !this.isPlaying;
    },

    /**
     * @desc 切换静音
     */
    handleToggleMute() {
      this.isMute = !this.isMute;
    },

    /**
     * @desc 切换全屏
     */
    handleToggleScreen() {
      this.isFullScreen = !this.isFullScreen;
    },

    // 格式化时间 hh:mm:ss
    formatTime(seconds) {
      var h = parseInt(seconds / 3600);
      var m = parseInt((seconds % 3600) / 60);
      var s = parseInt(seconds % 60);
      if (h) {
        return this.formatZero(h) + ':' + this.formatZero(m) + ':' + this.formatZero(s);
      } else {
        return this.formatZero(m) + ':' + this.formatZero(s);
      }
    },
    // 格式化时间 个位数前面补 '0'
    formatZero(num) {
      return num < 10 ? '0' + num : num;
    },
  },
};
