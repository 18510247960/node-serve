const conn = require('./conn.js')
const successCode = 200
const failCode = 500
module.exports = {
  // 测试 API 服务器能否正常被请求
  testAPI: (req, res) => {
    res.send('请求后台API接口成功！')
  },
  // 获取所有英雄列表
  getAllHero: (req, res) => {
    const sql = 'select * from user'
    conn.query(sql, (err, result) => {
      // 如果读取数据失败，则返回一个失败的结果
      if (err) return res.send({ status: 500, msg: err.message, data: null })
      // 如果获取数据成功，则直接返回成功的数据结果
      res.send({ status: 200, msg: 'ok', data: result })
    })
  },
  // 添加英雄
  addHero: (req, res) => {
    // 1. 获取到客户端提交到 服务器的 表单数据
    // 获取到 客户端提交过来的 英雄名称、性别 即可
    // 获取服务器的当前时间，当作 英雄的添加时间
    const hero = req.body
    // 得到当前的时间对象
    const dt = new Date()

    // 字符串，有一个新方法，叫做 padStart(长度, 要填充的字符串)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1).toString().padStart(2, '0')
    const d = dt
      .getDate()
      .toString()
      .padStart(2, '0')

    const hh = dt
      .getHours()
      .toString()
      .padStart(2, '0')
    const mm = dt
      .getMinutes()
      .toString()
      .padStart(2, '0')
    const ss = dt
      .getSeconds()
      .toString()
      .padStart(2, '0')
    // 补全英雄的添加时间
    hero.ctime = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

    // 调用 conn.query 实现 添加英雄
    const sql = 'insert into user set ?'
    conn.query(sql, hero, (err, result) => {
      if (err) return res.send({ status: 500, msg: err.message, data: null })
      res.send({ status: 200, msg: 'ok', data: null })
    })
  },
  // 根据Id获取英雄信息
  getHeroById: (req, res) => {
    // 1. 获取到英雄的Id
    // 2. 根据Id查询数据，并返回给客户端查询的结果
    const id = req.params.id
    const sql = 'select * from user where id=?'
    conn.query(sql, id, (err, result) => {
      if (err) return res.send({ status: 500, msg: err.message, data: null })
      res.send({ status: 200, msg: 'ok', data: result })
    })
  },
  // 根据 Id 更新英雄信息
  updateHeroById: (req, res) => {
    const id = req.params.id
    const newInfo = req.body
    const sql = 'update user set ? where id=?'
    conn.query(sql, [newInfo, id], (err, result) => {
      if (err) return res.send({ status: 500, msg: err.message, data: null })
      res.send({ status: 200, msg: 'ok', data: null })
    })
  },
  // 根据Id删除英雄信息
  deleteHeroById: (req, res) => {
    const id = req.params.id
    const sql = 'update user set isdel=1 where id=?'
    conn.query(sql, id, (err, result) => {
      if (err) return res.send({ status: 500, msg: err.message, data: null })
      res.send({ status: 200, msg: 'ok', data: null })
    })
  }
}