const express = require('./node_modules/express');
const mysql = require('./node_modules/mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    db: 'nodemysql'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('mysql connected...');
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('DATABASE CREATED.');
    })
});

app.get('/use', (req, res) => {
    let sql = 'use nodemysql'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('use created...');
    });
})

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE FILES(ID INT PRIMARY KEY,NAME VARCHAR(50) NOT NULL,ORIGINAl VARCHAR(50) NOT NULL)'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('table created...');
    });
})

app.post('/insert', (req, res) => {
    let file = {
        id          : req.body.id,
        name        : req.body.name,
        ORIGINAl    : req.body.name
    }
    let sql = 'insert into files set ?';
    let query = db.query(sql,file,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send('one raw inserted...');
    })

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});