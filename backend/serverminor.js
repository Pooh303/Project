const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2')
const app = express()

//ทำการแปลงข้อมูลให้เป็น obj ไม่งั้นเพิ่มไม่ได้
app.use(express.json());

const connection = mysql.createConnection({
    host: '161.246.127.24',
    user: 'admin',
    password: 'admin',
    database: 'minorcineplex',
    port: '9061'
})

//Check error
connection.connect((err) => {
    if(err){
        console.log('error connecting to MYSQL = ', err)
        return; //stop
        }
    console.log('MySQL successfully connected!');
})


/*create routes 
เพิ่มข้อมูลลง database*/
app.post("/create", async(req, res) => {
    //สร้างตัวแปร ดึงข้อมูลจาก req.body
    const {username, password} = req.body;
    try{
        connection.query(
            "INSERT INTO Member(username, password) VALUES(?, ?)", [username, password],
            (err, results, fields) => {
                if(err){
                    console.log("Error while inserting a user into the database", err)
                      return res.status(400).send();
                }
                //ไม่ error ก็ส่ง
                return res.status(201).json({message: "New user successfullly create"});
            }
        )

    }catch(err){
        console.log(err);
        return res.status(500).send()
    }

})



app.listen(3000, () => console.log('Server is running on port 9061'));




// app.get('/testdb', (req, res) =>[
//     mysql.createConnection({
//         host: '161.246.127.24',
//         port: '9061',
//         user: 'admin',
//         password: 'admin',
//         database: 'minorcineplex'

//     }).then((conn) => {
//         conn
//         .query('SELECT * FROM Member')
//         .then((results) => {
//             res.json(results[0])
//         })
//     })
// ])
