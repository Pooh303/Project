const {createPool} = require('mysql')


const pool = createPool({
    host: '161.246.127.24',
    port: '9061',
    user: 'admin',
    password: 'admin',  
    connectionLimit: 10
})


pool.query(`select * from minorcineplex.Member`), (err, res)=>{
    return console.log(res)
}