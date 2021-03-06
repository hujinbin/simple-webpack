
'use strict'
require('colors');

const fs = require('fs')
const ejs = require('ejs')
const path = require("path");


module.exports = async function () {
  console.log("这是simplewebpack".blue)
  let enter = "./src/index.js"
  let output = path.resolve(process.cwd(), "./dist/main.js");
  
  let enterPath = path.resolve(process.cwd(), "./src/index.js");
  let script = fs.readFileSync(enterPath,'utf8');
  
  let template = `(function (modules) {
    function require(moduleId) {
      var module = {
        exports: {},
      };
  
      modules[moduleId].call(module.exports, module, module.exports, require);
  
      return module.exports;
    }
  
    return require("<%- enter %>");
  })({
    "<%- enter %>": function (module, exports) {
      eval(\`<%- script %>\`);
    },
  });
  `;
  
  
  let result = ejs.render(template, {
    enter,
    script,
  });
  
  fs.writeFileSync(output, result);
  
  
  console.log("simplewebpack 构建成功".green);
}
