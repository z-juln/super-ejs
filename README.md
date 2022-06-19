## super-ejs

超级版ejs

在ejs基础上增加了api —— `gerenateDir`, 可以将一整个ejs模板目录全部编译，并存储到对应的目录上

**!!!: 如果目录里存在文件，gerenateDir方法会直接对文件进行覆盖**

## 使用

```npm i super-ejs -S```

or

```yarn add super-ejs```

```javascript
const superEjs = require('super-ejs');

superEjs.gerenateDir(
  outputPath: '生成的目标目录路径',
  tplDirPath: '你的ejs模板目录路径',
  { name: componentName, hi() { return 'hi'; } }, // ejs的data参数，具体看ejs官网
  { _with: true }, // ejs的options参数，具体看ejs官网
  { parseFilename: true, ignore: 'node_modules/**' },
  // superEjs特有的参数
);
```

## 参数

| 参数 | 默认值 | 描述 |
|  -  | -  | -  |
| parseFilename | false | 支持把文件名或目录名用ejs来解析并重命名 |
| ignore | undefined | 要忽略的目录或文件，值可以是字符串或数组

### 参数 `parseFilename`

当 `parseFilename` 为 `true` 时, 会把文件名或目录名用ejs来解析并重命名, 如文件名 `<%= name %>.tsx`, 但不支持设置为 `true`, 因为这个文件名是不合法的。

`parseFilename` 可以为一个字符串替换的函数, 比如 `(orignal) => orignal.replace('__name__', name)`, 最好使用这种方式进行替换
