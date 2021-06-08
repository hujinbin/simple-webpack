
'use strict'
console.log("这是simplewebpack")

const packageInfo = require('../package.json');
const commander = require('commander');



commander.version(packageInfo.version, '-v, --version');