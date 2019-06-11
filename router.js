// 路由模块  本质：就是 URL 地址到 处理函数之间的对应关系
const express = require('express')
const router = express.Router()
const conn = require('./conn.js')

// 导入自己的 业务逻辑处理模块
const cont = require('./controller.js')

// 只要有人请求 后台的 / 根路径地址，就提示他，请求API服务器成功了！
router.get('/', cont.testAPI)

// 用户登录接口
router.post('/api/login',(req, res) => {
  const phone = req.body.phone
  console.log(phone)
  const password = req.body.password
  const sqlStr = 'select * from user where phone = ?'
  conn.query(sqlStr, phone, (err,results) => {
      if(err) return res.json({code: 1, message:'获取数据失败!'})
      if(results.length !== 1) return res.json({code: 1, message:'数据不存在!'})
      if(results[0].password === password){
        res.json({ code: 0, message: '登录成功!'})
      }else{
        res.json({code: 1, message: '用户名或密码错误!'})
      }
  })
})

// 用户注册接口
router.post('/api/register',(req,res) => {
  const userInfo = req
  console.log(userInfo)
  // conn.query(sql, userInfo, (err, result) => {
  //   if (err) return res.send({ status: 500, msg: err.message, data: null })
  //   res.send({ status: 200, msg: 'ok', data: null })
  // })
})

// 根据ID 获取相关数据
// 对外暴露 getAllHero 接口
router.get('/getallhero', cont.getAllHero)

// 对外暴露添加英雄的API接口
router.post('/addhero', cont.addHero)

// 对外暴露 获取英雄信息的 API 接口
router.get('/gethero/:id', cont.getHeroById)

// 对外暴露 根据Id更新英雄数据的API接口
router.post('/updatehero/:id', cont.updateHeroById)

// 对外暴露 根据Id软删除英雄数据的API接口
router.get('/deletehero/:id', cont.deleteHeroById)

module.exports = router