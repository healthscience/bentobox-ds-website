module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test/'
    : '/'
    // ? '/healthscience/code/healthscience-website/dist/'
    // : '/healthscience/code/healthscience-website/dist/'
}
