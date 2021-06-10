#!/usr/bin/env node
const commander = require('commander');

// 单层打包
const build = require('./index');
commander.command('build')
.action(()=>{
    eval(build);
})

// 两层嵌套打包
// const deep = require('./deep');
// commander.command('build')
// .action(()=>{
//     eval(deep);
// })