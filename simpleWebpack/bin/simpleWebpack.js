#!/usr/bin/env node
const commander = require('commander');
const build = require('./index.js');
const deep = require('./deep.js');

// 单层打包
commander.command('build')
.action(()=>{
    build()
})

// 两层嵌套打包
commander.command('deep')
.action(()=>{
    deep();
})

  
commander.parse(process.argv);