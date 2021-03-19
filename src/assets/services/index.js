import Ajax from '/@/assets/http/ajax';

// 获取banner图片
export const getAdvertInfo = async params => {
  return Ajax({
    url: '/resource/anon/advertPlan/getAdvertInfo',
    method: 'POST',
    data: params
  });
};
