const express = require('express')
const Router = require('./router.js')
const cors = require('cors')
const fs = require('fs')
let writeLog = fs.createWriteStream("./log.txt");

const app = express()

app.use('/images/', express.static('./images/'))
app.use('/video/', express.static('./video/'))
// 获取body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE')
//   next()
// })
app.use(cors())
// 访问日志
app.use('/', async (req, res, next) => {
  let logStr = req.socket.remoteAddress + ":" + req.socket.remotePort + '\n'
  writeLog.write(logStr)
  next()
})
app.use(Router)

app.listen(3000, () => {
  console.log('app is running...');
})