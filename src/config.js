require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Heckmeck',
    description: 'Board game.',
    head: {
      titleTemplate: 'Heckmeck: %s',
      meta: [
        {name: 'description', content: 'Heckmeck board game.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Heckmeck'},
        {property: 'og:image', content: 'http://www.event.spielevater.de/images/content/Herbst_2008/HM-Wurm-RGB.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Heckmeck'},
        {property: 'og:description', content: 'http://www.event.spielevater.de/images/content/Herbst_2008/HM-Wurm-RGB.jpg'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@alastor'},
        {property: 'og:creator', content: '@alastor'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
