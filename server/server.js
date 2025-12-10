const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const secret = 'eopjtasofjasl;damsdkla';

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: '1h' });
}

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await pool.query('SELECT * FROM posttable ORDER BY date DESC;');
        res.json(posts.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

app.get('/api/post/:id', async (req, res) => {
    try{
        const post = await pool.query('SELECT * FROM posttable WHERE id = $1');
        res.json(post.rows);
    } catch (e) {
        console.log(e.message);
    }
})

app.delete('/api/delete/allPosts', async (req, res) => {
    try {
        await pool.query('DELETE FROM posttable');
    } catch (e) {
        console.log(e.message);
    }
})
