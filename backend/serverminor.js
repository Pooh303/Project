const express = require('express')
const session = require('express-session')
const bodyparser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')
const path = require('path');
const morgan = require('morgan');
const cookieSession = require('cookie-session')

let port = 8000;
const app = express()
app.use(cors());

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
//app.set('frontend', path.join(__dirname, 'frontend'));

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 3600*1000 //1 hr

}))

/* เชื่อมฐานข้อมูล */
const connection = mysql.createConnection({
    host: '161.246.127.24',
    port: '9061',
    user: 'admin',
    password: 'admin',
    database: 'minorcineplex'
})
    //Check error
connection.connect((error) => {
    if(error){
        console.log('Error connectinf to MySQL = ', error)
    }
    console.log('MySql successfully connected')
})
/* จบการเชื่อมฐานข้อมูล */

//--------- REGISTER ---------//
app.post('/member/register', async(req, res) =>{
    const {First_Name, Last_Name, Username, Password} = req.body

    try{
       connection.execute("INSERT INTO Member(First_Name, Last_Name, Username, Password) VALUES(?,?,?,?)", 
       [First_Name, Last_Name, Username, Password],
       (error, results, field) => {
        if(error){
            console.log(error);
            return res.status(400).send();
        }
        // status 200 = OK
        res.status(200).json({massage: "register successfully"});
       })
    }
    catch(error){
        console.log(error);
        return res.status(500).send();
    }
})

//--------- LOGIN ---------//
app.post('/member/login', async (req, res) => {
    const { Username, Password } = req.body;

    try{
    const [rows] = await connection.promise().execute("SELECT * FROM Member WHERE Username = ? AND password = ?",
    [Username, Password])
    if(rows.length === 1){
        req.session.user = rows[0]
        console.log("Member login")
        res.send('login successfully')
        
        }else{
            res.send("login fail")
        }
    }
    catch(error){
        console.error('Something wrong:', error.message)
        return res.status(500).send('Something wrong')
    }

    
});


//------------- test API CRUD -------------//

/* POST
เพิ่มข้อมูลลง database
จะ 'เพิ่ม' อะไรก็เปลี่ยนเป็นตารางนั้นเลย
*/
app.post('/create', async(req, res) =>{
    const {First_Name, Last_Name, Username, Password} = req.body;
    try{
        connection.query(
            "INSERT INTO Member(First_name, Last_name, Username, Password) VALUES(?, ?, ?, ?)",
            [First_Name, Last_Name, Username, Password],
            (error, results, fields) => {
                if(error){
                console.log('"Error to insert', error);
                return res.status(400).send();
                }
                return res.status(201).json({message: "insert successfully"});
            }       
        )

    }catch(error){
        console.log(err);
        return res.status(500).send();
    }
})
/*
จบการเพิ่มข้อมูลลง database
*/


/* GET
ดึงข้อมูลจาก database มาแสดง
จะ 'ดึง' อะไรก็เปลี่ยนเป็นตารางนั้นเลย
*/

// ดึงหลายตัว
app.get('/read' , async(req, res) => {
    try{
        connection.query("SELECT * FROM Member", (error, results, fields) => {
            if(error){
                console.log(error);
                return res.status(400).send();
            }
            // status 200 = OK
            res.status(200).json(results);
        })
    }catch(error){
        console.log(error);
        return res.status(500).send();
    }

})

//ดึงตัวเดียว
app.get('/read/single/:Username', async(req, res) => {
    //รับข้อมูลจาก params
    const Username = req.params.Username;

    try{
        connection.query("SELECT * FROM Member WHERE Username = ?", 
        [Username],
        (error, results, fields) => {
            if(error){
                console.log(error);
                return res.status(400).send();
            }
            // status 200 = OK
            res.status(200).json(results);
        })
    }catch(error){
        console.log(error);
        return res.status(500).send();
    }

})
/*
จบการดึงข้อมูลจาก database
*/

/* PATCH
ทำการแก้ไข หรืออัพเดทข้อมูลใน database เข้าถึงเฉพาะ field 
ที่ส่งเข้ามาเท่านั้น (แตกต่างกับ PUT ที่ access ทุก field)
*/
app.patch('/update/:Username', async(req, res) => {
    const Username = req.params.Username;
    const newUsername = req.body.newUsername;

    try{
        connection.query("UPDATE Member SET Username = ? WHERE Username = ?", 
        [newUsername, Username],
        (error, results, fields) => {
            if(error){
                console.log(error);
                return res.status(400).send();
            }
            // status 200 = OK
            res.status(200).json({massage: "Update username successfully"});
        })
    }catch(error){
        console.log(error);
        return res.status(500).send();
    }
})
/*
จบการอัพเดทข้อมูลลง database 
*/

/* DELETE
ลบข้อมูลใน database
*/
app.delete("/delete/:Username", async(req, res) => {
    const Username = req.params.Username;

    try{
        connection.query("DELETE FROM Member WHERE Username = ?", 
        [Username],
        (error, results, fields) => {
            if(error){
                console.log(error);
                return res.status(400).send();
            }
            // โดนลบจริง จะ return ออกมา
            if(results.affectedRows === 0){
                return res.status(404).json({massage: "No Username in database"});
            }
            return res.status(200).json({massage: "Username delete successfully"});
        })
    }catch(error){
        console.log(error);
        return res.status(500).send();
    }
})
/*
จบการลบข้อมูลใน database 
*/

// START SERVER
app.listen(port,() => {
    console.log('Server is running on port ' + port)
});
