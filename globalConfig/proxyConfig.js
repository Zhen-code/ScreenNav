module.exports = {
  proxyList: {
    "/apiTest": {
      target: `${process.env.BASE_URL}`, //设置调用接口域名和端口号别忘了加http
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin: true,
      ws: true,
      toProxy: true,
      pathRewrite: {
        "^/apiTest": "/"
      },
      headers: {},
      // bypass: function(req, res, proxyOptions) {
      //   console.log("bypass", req, res, proxyOptions);
      // },
      // onError(err, req, res) {
      //  console.log(err, req, res);
      // }
    },
    "/apis": {
      target: `${process.env.BASE_URL}`,
      secure: false,
      changeOrigin: true,
      ws: true,
      toProxy: true,
      pathRewrite: {
        "^/apis": "/"
      }
    }
  }
};
