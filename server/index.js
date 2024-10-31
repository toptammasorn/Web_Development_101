const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const port = 8000;

app.use(bodyparser.json());

let conn = null

const initMySQL = async () => {
    // Create a connection to the database
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tutorials',
        port: 8889
    })
}

// path = GET /users
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users')
    res.json(results[0])
})

// path = POST /users
app.post('/users', async (req, res) => {
    try {
        let user = req.body
        const results = await conn.query('INSERT INTO users SET ?', user)
        res.json({
            message: 'insert complete',
            data: results[0]
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({
            message: 'something went wrong',
        })
    }
});

// path = GET /users by id
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'User not found' }
        }
        res.json(results[0][0])
    } catch (error) {
        console.error('error message', error.message)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({
            message: 'something went wrong',
        })
    }
})

// path = PUT /users/:id
app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        let updateUser = req.body
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id])
        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'User not found' }
        }
        res.json({
            message: 'update complete',
            data: results[0]
        })
    } catch (error) {
        console.error('error message', error.message)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({
            message: 'something went wrong',
        })
    }
});

// path = DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('DELETE from users WHERE id = ?', id)
        res.json({
            message: 'delete complete',
            data: results[0]
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({
            message: 'something went wrong',
        })
    }
});

app.listen(port, async (req, res) => {
    await initMySQL()
    console.log(`Server is running on port ${port}`)
})