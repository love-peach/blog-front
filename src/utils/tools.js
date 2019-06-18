/**
 * @desc 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/**
 * @desc 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

// https://www.cnblogs.com/momo798/p/9177767.html

/**
 * @desc 防抖 如 input。核心：在给定的时间间隔内 只触发一次 取消上一次。连续的操作 只触发一次。
 */
export const debounce = (fn, wait = 500) => {
  console.log(fn);
  var timer = null;

  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
    // timer = setTimeout(fn, wait);
  };
};

/**
 * @desc 节流 对高频事件的优化  如 scroll。
 * 与防抖区别：防抖在连续的操作过程中只触发一次，而节流可能触发多次，但是频率变低了。
 */
export const throttle = (fn, interval = 300) => {
  var timer = null;
  var timeStart = new Date();

  return function() {
    const now = new Date();
    const space = now - timeStart;
    if (space > interval) {
      fn.apply(this, arguments);
      timeStart = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // 这个 时候 currentTarget 为 null
        fn.apply(this, arguments);
      }, interval);
    }
  };
};

/**
 * @desc 节流（定时器方案） 对高频事件的优化  如 scroll。核心：间隔时间内 打开可执行标志。
 * 优点：确保最终结果，因为是延迟执行。
 * 缺点：不能马上触发 （方向键操作试下）
 */
export const throttle1 = (fn, interval = 1000) => {
  var timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        clearTimeout(timer);
        timer = null;
      }, interval);
    }
  };
};

/**
 * @desc 节流（时间戳方案） 对高频事件的优化  如 scroll。 核心： 每隔给定时间，触发一次。
 * 优点：立即触发
 * 缺点：如果上一次停止操作的时间 跟下次操作时间没有超过给定的时间 将不会触发。（时间设置大一点 方向键操作试下）
 */
export const throttle2 = (fn, interval = 2000) => {
  var timeStart = new Date();
  return function() {
    const now = new Date();
    if (now - timeStart > interval) {
      fn.apply(this, arguments);
      timeStart = now;
    }
  };
};

/**
 * @desc 检测是不是空对象
 */
export const isEmptyObject = obj => obj && Object.keys(obj).length === 0;

/**
 * @desc 对象 深合并
 */
export const deepMerge = (obj1, obj2) => {
  var key;
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]' ? deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key]);
  }
  return obj1;
};

/**
 * @desc url 上获取参数
 */
export const getQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var reg_rewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  var q = window.location.pathname.substr(1).match(reg_rewrite);
  if (r != null) {
    return unescape(r[2]);
  } else if (q != null) {
    return unescape(q[2]);
  } else {
    return null;
  }
};

/**
 * @desc 检测 value 是否在 validList 中
 * @param value 需要检测的值
 * @param validList 检测列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

/**
 * @desc 下载文件 张杰
 */
export const downloadfile = (name, res) => {
  var blob = new Blob([res], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  var downloadElement = document.createElement('a');
  var href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = name + '.xlsx'; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};

/**
 * @desc 下载文件 张晋佩
 */
export const DownLoadFile = options => {
  let config = { method: 'post' };

  let tempIframe = document.createElement('iframe');
  tempIframe.id = 'down-file-iframe';

  let tempForm = document.createElement('form');
  tempForm.method = config.method;
  tempForm.action = options.url;
  for (let key in options.data) {
    let tempInput = document.createElement('input');
    tempInput.name = key;
    tempInput.value = options.data[key];
    tempInput.type = 'hidden';
    tempForm.appendChild(tempInput);
  }
  tempIframe.appendChild(tempForm);
  document.body.appendChild(tempIframe);
  tempForm.submit();
};
