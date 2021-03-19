import { Toast } from 'vant';
let needLoadingRequestCount = 0;
let loading;

function startLoading() {
  loading = Toast.loading({
    forbidClick: true,
    duration: 0,
    loadingType: 'spinner',
  });
}

function endLoading() {
  loading.clear()
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};

export function showLoading(config) {
  const { cancelLoading } = config;
  if (cancelLoading) return;
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function hideLoading(config) {
  const { cancelLoading, cancelImmediately } = config;
  if (cancelLoading) return;
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount == 0 || cancelImmediately) {
    endLoading()
  } else {
    debounce(endLoading, 300)()
  }
}

export function toast(txt, type, cancelImmediately) {
  setTimeout(function () {
    if (type == 'success') {
      Toast.success(txt);
    } else {
      Toast.fail(txt);
    }
  }, cancelImmediately ? 0 : 400)
}

function debounce(fn, delay) {
  let timer = null;

  return function () {
    let args = arguments;
    let context = this;
    if (timer) {
      clearTimeout(timer);

      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  }
}