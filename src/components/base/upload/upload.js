import ajax from './ajax';

export default {
  name: 'Upload',
  props: {
    action: {
      type: String,
      // required: true,
    },
    headers: {
      type: Object,
      default() {
        return {};
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
    name: {
      type: String,
      default: 'file',
    },
    format: {
      type: Array,
      default() {
        return [];
      },
    },
    accept: {
      type: String,
    },
    maxSize: {
      type: Number,
    },
    beforeUpload: Function,
    onProgress: {
      type: Function,
      default() {
        return {};
      },
    },
    onSuccess: {
      type: Function,
      default() {
        return {};
      },
    },
    onError: {
      type: Function,
      default() {
        return {};
      },
    },
    onExceededSize: {
      type: Function,
      default() {
        return {};
      },
    },
    onFormatError: {
      type: Function,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      file: '',
    };
  },
  methods: {
    /**
     * @desc 点击事件
     */
    handleClick() {
      if (this.disabled) return;
      this.$refs.input.click();
    },

    handleChange(e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      this.uploadFiles(files);
      this.$refs.input.value = null;
    },
    uploadFiles(files) {
      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }
      if (postFiles.length === 0) {
        return;
      }
      postFiles.forEach(file => {
        this.upload(file);
      });
    },

    upload(file) {
      // 如果 不传递了 beforeUpload 则 默认自动上传
      if (!this.beforeUpload) {
        return this.post(file);
      }
      // 如果 传递了 beforeUpload 则 调用 beforeUpload
      const before = this.beforeUpload(file);

      // 如果 beforeUpload 返回一个 promise
      if (before && before.then) {
        before.then(
          processedFile => {
            if (Object.prototype.toString.call(processedFile) === '[object File]') {
              this.post(processedFile);
            } else {
              this.post(file);
            }
          },
          () => {
            // this.$emit('cancel', file);
          }
        );
      } else if (before !== false) {
        this.post(file);
      } else {
        // this.$emit('cancel', file);
      }
    },

    post(file) {
      // check action
      if (!this.action) {
        this.$toast.error('请传 action 或者 beforeUpload');
        return false;
      }

      // check format
      if (this.format.length) {
        const _file_format = file.name
          .split('.')
          .pop()
          .toLocaleLowerCase();
        const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
        if (!checked) {
          this.onFormatError(file);
          return false;
        }
      }
      // check maxSize
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          this.onExceededSize(file);
          return false;
        }
      }

      let formData = new FormData();
      formData.append(this.name, file);
      ajax({
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: file,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, file);
        },
        onSuccess: res => {
          this.onSuccess(res, file);
        },
        onError: (err, response) => {
          this.onError(err, response, file);
        },
      });
    },
  },
};
