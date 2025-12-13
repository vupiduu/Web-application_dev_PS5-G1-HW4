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
    return jwt.sign({ id }, secret, { expiresIn: '1h'});
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

app.post('/auth/login', async (req, res) => {
    try{
        console.log("Login request arrived")
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });
        const validPW = await bcrypt.compare(password, user.rows[0].password);
        if (validPW === false) return res.status(401).json({ error: "Incorrect Password" });
        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    }catch (e){
        res.status(400).send(e.message);
    }
})
app.post('/auth/signup', async (req, res) => {
    try{
        console.log("Sign up request reached")
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(4);
        const hashedPW = await bcrypt.hash(password, salt);
        const authUser = await pool.query("INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, hashedPW]);
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (e) {
        res.status(400).send(e.message);
    }
})
app.get('/auth/logout', async (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
})

app.get('/auth/authenticate', async(req, res) => {
    const token = req.cookies.jwt;
    let authenticated = false;
    try {
        if (token) {
            await jwt.verify(token, secret, (err) => {
                if (err) {
                    console.log(err.message);
                    res.send({ "authenticated": authenticated });
                } else {
                    authenticated = true;
                    res.send({ "authenticated": authenticated });
                }})}
        else {res.send({ "authenticated": authenticated });}
    }
    catch (err) {
        res.status(400).send(err.message);}
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

app.post('/api/posts', async (req, res) => {
    try {
        const { body } = req.body;

        if (!body) return res.status(400).json({ error: "Body is required" });

        await pool.query(
            'INSERT INTO posttable (body, date) VALUES ($1, NOW())',
            [body]
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

app.put('/api/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;

        await pool.query(
            'UPDATE posttable SET body = $1 WHERE id = $2',
            [body, id]
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

app.delete('/api/post/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            'DELETE FROM posttable WHERE id = $1',
            [id]
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
