export const callApp = (method, params) => {
  return new Promise((res, rej) => {
    try {
      readyFn(() => {
        bridge.call(method, params, data => {
          res(JSON.parse(data));
        });
      });
    } catch (e) {
      rej(e);
    }
  });
};
