var express = require('express')
const path = require('path')
    // 2. 创建服务器
var app = express();
// 托管静态资源
// 也可以将所有静态资源放置到指定的目录下，如public,然后添加以下的配置
// app.use(express.static('dist'))
app.use('/', express.static(path.join(__dirname, 'dist')))

// 3. 开启服务器并监听端口
app.listen(3001, () => {
    console.log('http://127.0.0.1:3001')
})