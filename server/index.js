const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const port = 8000;

app.use(bodyparser.json());
let users = [];

// path = /
app.get('/test', (req, res) => {
    let user = {
        firstname: 'John',
        lastname: 'Doe',
        age: 25
    }
    res.json(user)
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

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})