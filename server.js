// server.js
const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

// 데이터베이스 연결 설정
const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the database.');
        // 데이터베이스에 테이블 생성
        db.run(`CREATE TABLE IF stock does NOT EXIST  (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            note TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Table created successfully.');
            }
        });
    }
});

// 정적 파일 제공
app.use(express.static('public'));

// POST 요청을 처리하여 데이터베이스에 제품 등록
app.post('/stock', (req, res) => {
    const { productName, quantity, note } = req.body;
    if (!productName || !quantity || isNaN(quantity) || quantity <= 0 || !note) {
        return res.status(400).send('올바른 제품명, 수량, 비고를 입력하세요.');
    }

    const stmt = db.prepare('INSERT INTO stock (productName, quantity, note) VALUES (?, ?, ?)');
    stmt.run(productName, quantity, note, (err) => {
        if (err) {
            console.error('데이터베이스 삽입 오류:', err);
            res.status(500).send('내부 서버 오류.');
        } else {
            console.log('재고 등록 완료:', { productName, quantity, note });
            res.status(200).json({ productName, quantity, note });
        }
    });
});

// GET 요청을 처리하여 데이터베이스에서 재고 목록 반환
app.get('/stock', (req, res) => {
    db.all('SELECT * FROM stock', (err, rows) => {
        if (err) {
            console.error('데이터베이스 조회 오류:', err);
            res.status(500).send('내부 서버 오류.');
        } else {
            res.json(rows);
        }
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
