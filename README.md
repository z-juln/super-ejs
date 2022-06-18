## super-ejs

超级版ejs

在ejs基础上增加了api —— `gerenateDir`, 可以将一整个ejs模板目录全部编译，并存储到对应的目录上

## 使用

```npm i super-ejs -S```

or

```yarn add super-ejs```

```javascript
const superEjs = require('super-ejs');

superEjs.gerenateDir(
  outputPath,
  tplDirPath,
  { name: componentName, hi() { return 'hi'; } },
);
```
