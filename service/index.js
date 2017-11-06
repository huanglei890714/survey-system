
require('babel-register')
require('babel-polyfill')

global.Promise = require('bluebird')

require('./src/service')
