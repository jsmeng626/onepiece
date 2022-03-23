const express = require('express')
const { getReadFile, getWriteFile } = require('./myFs')
const pool = require('./mysql')

// 获取读取文件的路径
const { join } = require('path')
const userFileName = join(__dirname, 'users.json')
const introListFileName = join(__dirname, 'intro.json')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('you are so beauty')
})

router.post('/registor', async (req, res) => {
  let user = req.body
  if (user.username == '' || user.password == '') {
    res.send({ status: 400, msg: '用户名或密码不能为空' })
    return
  }
  let data = await getReadFile(userFileName)
  let isUser = data.findIndex(item => item.username == user.username)

  if (isUser !== -1) {
    res.send({ status: 400, msg: '用户名已存在' })
    return
  }

  user.id = data[data.length - 1].id + 1
  data.push(user)
  let result = await getWriteFile(userFileName, data)
  if (result == undefined) {
    res.send({ status: 200, msg: '注册成功' })
  } else {
    res.send({ status: 500, msg: '注册失败' })
  }
})

router.post('/login', async (req, res) => {
  let user = req.body
  if (user.username == '' || user.password == '') {
    res.send({ status: 400, msg: '用户名或密码不能为空' })
    return
  }
  let data = await getReadFile(userFileName)
  let isLogin = data.some(item => item.username == user.username && item.password == user.password)

  if (isLogin) {
    let tokenArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
    let token = ''
    tokenArr.forEach(() => {
      let index = parseInt(Math.random() * tokenArr.length)
      token += tokenArr[index]
    })
    res.send({ status: 200, msg: '登录成功', token })
  } else {
    res.send({ status: 400, msg: '账号或密码错误' })
  }
})

router.get('/queryUser', (req, res) => {
  // 判断分页
  let pageNum = Number(req.query.pageNum)
  pageNum = pageNum === 0 ? 0 : pageNum === 1 ? 0 : (pageNum - 1) * 10
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(`select * from onepieceuser limit ${pageNum},10`, (error, result) => {
      if (!error) {
        res.send({ status: 200, msg: '查询成功', data: result })
      } else {
        res.send({ status: 500, msg: '查询失败' })
        throw error;
      }
      // 释放连接
      connection.release();
    })
  });
})

router.post('/addUser', (req, res) => {
  let { name, age, gender, club, phone } = req.body
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(`insert into onepieceuser (name,age,gender,club,phone) values ('${name}','${age}','${gender}','${club}','${phone}')`, function (error, results) {
      if (!error) {
        res.send({ status: 200, msg: '添加成功' })
      } else {
        res.send({ status: 500, msg: '添加失败' })
        throw error;
      }
      connection.release()
    });
  })
})

router.post('/editUser', (req, res) => {
  let { Id, name, age, gender, club, phone } = req.body
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(`update onepieceuser set name='${name}',age='${age}',gender='${gender}',club='${club}',phone='${phone}' where id=${Id}`, function (error, results) {
      if (!error) {
        res.send({ status: 200, msg: '修改成功' })
      } else {
        res.send({ status: 500, msg: '修改失败' })
        throw error;
      }
      connection.release()
    });
  })
})

router.delete('/delUser', (req, res) => {
  let Id = req.query.id
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`delete from onepieceuser where Id=${Id}`, (error) => {
      if (!error) {
        res.send({ status: 200, msg: '删除成功' })
      } else {
        res.send({ status: 500, msg: '删除失败' })
      }
      connection.release()
    })
  })
})

router.get('/imgList', async (req, res) => {
  try {
    const data = await getReadFile(introListFileName)
    res.send({ status: 200, msg: '获取图片成功', data })
  } catch (err) {
    res.send({ status: 500, msg: '获取图片失败', err })
  }
})

router.get('/detail', async (req, res) => {
  try {
    let id = Number(req.query.id)
    const data = await getReadFile(introListFileName)
    const obj = data.find(item => item.id === id)
    res.send({ status: 200, msg: '获取详情成功', data: obj })
  } catch (err) {
    res.send({ status: 500, msg: '获取失败', err })
  }
})

router.get('/movie', async (req, res) => {
  try {
    const url = 'http://192.168.90.93:3000/video/movie.mp4'
    res.send({ status: 200, msg: '获取视频成功', url })
  } catch (err) {
    res.send({ status: 500, msg: '获取失败', err })
  }
})

module.exports = router