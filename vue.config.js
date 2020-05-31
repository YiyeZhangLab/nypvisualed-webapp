module.exports = {
  devServer: {
    proxy: 'http://localhost:3000',
    disableHostCheck: true

  },
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
