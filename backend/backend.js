const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('musql2/promise')
const app = express()

app.use(bodyparser.json())

const port = 8000

//เก็บ User
let users = []
let counter = 1

// สร้าง API path '/' และคืนคำ Hello world ออกมาผ่าน API
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  // ประกาศ​gxbf http server ที่ port 8000 (ตามตัวแปร port)
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
