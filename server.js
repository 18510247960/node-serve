const express = require('express')
const app = express()

// 注册 body-parser 中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// 在 API 服务器端，启用 CORS 跨域资源共享
const cors = require('cors')
app.use(cors())

// 导入自己的路由模块
const router = require('./router.js')
// 注册路由模块
app.use(router)

app.listen(3000, function() {
  console.log('api server running at http://127.0.0.1:3000')
})
