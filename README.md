<h1 align="center">
  node-copy-files
</h1>

> A library based on the Node's replication directory and operating on the results.
一个基于 Node 的复制目录，并对结果进行操作的库。

## Use Examples

```javascript
// download copy-files 下载 copy-files 库
npm install -d node-copy-files

// use
import copyFiles from 'node-copy-files'

// copy file 复制文件
copyFiles('input', 'output')

// copy file and operating on the results  复制文件并操作结果
copyFiles('input', 'output', (res, input, output) => {
  // operating result 操作文件
  return res
})
```

## LICENST

MIT
