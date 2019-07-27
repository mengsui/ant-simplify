const configs = {
  // 开发环境
  test: {
    API_SERVER: 'http://192.168.1.118',
  },

  // 生产环境
  development: {
    API_SERVER: 'https://xxxxxxx.com',
  },

  // 本地
  // local: {
  //   API_SERVER: 'your-api-path',
  // },
};
const API_ENV = process.env.API_ENV ? process.env.API_ENV : 'test';

console.log(process.env.API_ENV);

export default configs[API_ENV];
