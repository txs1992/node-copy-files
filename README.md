# node-copy-files

> 一个基于 Node 的复制目录，并对结果进行操作的库。

## 使用

```javascript
// 下载 copy-files 库

// 使用
import copyFiles from 'node-copy-files'

copyFiles('复制目录或文件', '目标目录或文件', function (input, output, result) {
  // 对读取的文件进行操作
  return result
})
```

## LICENST

MIT
