"use strict";
console.log("这是simplewebpack");

const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

let enter = path.resolve(__dirname, "./src/index.js");
let output = path.resolve(__dirname, "./dist/main.js");

let script = fs.readFileSync(enter, "utf-8");
let modules = []

let srcPath = path.resolve(__dirname, "./src");

// 正则匹配代码中reqire的依赖
script = script.replace(/require\(["'](.+?)["']\)/, function () {
  let name = path.join(srcPath, arguments[1]);
  let content = fs.readFileSync(name, 'utf-8')
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

  return require("<%-enter%>");
})({
  "<%-enter%>": function (module, exports, require) {
    eval(\'<%-script%>\');
  },
  <%for(let i = 0; i < modules.length; i++){
     let module = modules[i],
     "<%-module.name%>": function (module, exports, require) {
        eval(\'<%-module.content%>\');
     },
  }%>,
});
`;

let result = ejs.render(template, {
  enter,
  script,
  modules,
});

fs.writeFileSync(output, result);

console.log("simplewebpack 构建成功");
