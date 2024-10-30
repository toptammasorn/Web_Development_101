const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const port = 8000;

app.use(bodyparser.json());
let users = [];

// path = GET /users
app.get('/users', (req, res) => {
    res.json(users)
})

// path = POST /user
app.post('/user', (req, res) => {
    let user = req.body
    users.push(user)
    res.json({
        message: 'add ok',
        user: user
    })
});

// path = PUT /user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id
    res.send(id)
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})