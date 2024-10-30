const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const port = 8000;

app.use(bodyparser.json());

let users = [];
let counter = 1;

// path = GET /users
app.get('/users', (req, res) => {
    res.json(users)
})

// path = POST /user
app.post('/user', (req, res) => {
    let user = req.body
    user.id = counter
    counter++

    users.push(user)
    res.json({
        message: 'add ok',
        user: user
    })
});

// path = PUT /user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id

    // Find the user with the id
    let selectedIndex = users.findIndex(user => user.id == id)
    // update user

    // add updated user to users

    res.send(selectedIndex + '')
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})