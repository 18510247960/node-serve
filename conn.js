// 这是 数据操作模块，只负责 获取数据库连接对象

// 导入 mysql 模块
const mysql = require('mysql')
// 创建数据库连接
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'admin',
  password: 'admin',
  database: 'node'
})

module.exports = conn