"use strict";
require('colors');
console.log("这是simplewebpack deep".blue);

const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

let enter = path.resolve(process.cwd(), "./src/index.js");
let output = path.resolve(process.cwd(), "./dist/main.js");

let script = fs.readFileSync(enter, "utf8");
let modules = []

let srcPath = path.resolve(process.cwd(), "./src");

// 正则匹配代码中reqire的依赖
script = script.replace(/require\(["'](.+?)["']\)/, function () {
  let name = path.join(srcPath, arguments[1]+'.js');
  let content = fs.readFileSync(name, 'utf8')
  modules.push({
    name,
    content,
  });
  return `require('${name}')`
});

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
  "<%- enter %>": function (module, exports, require) {
    eval(\`<%- script %>\`);
  },
  <% for(let i = 0; i < modules.length; i++){ %>
     "<%- modules[i].name %>": function (module, exports, require) {
        eval(\`<%- modules[i].content %>\`);
     },
  <% } %>
});
`;

let result = ejs.render(template, {
  enter,
  script,
  modules,
});

fs.writeFileSync(output, result);

console.log("simplewebpack 构建成功".green);
