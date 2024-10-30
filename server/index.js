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
    let updateUser = req.body
    // Find the user with the id
    let selectedIndex = users.findIndex(user => user.id == id)
    // update user (handle case: null || old value)
    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname

    res.json({
        message: 'update ok',
        user: updateUser,
        indexUpdate: selectedIndex
    })
    // add updated user to users

    res.send(selectedIndex + '')
});

// path = PATCH /user/:id
app.patch('/user/:id', (req, res) => {
    let id = req.params.id
    let updateUser = req.body
    // Find the user with the id
    let selectedIndex = users.findIndex(user => user.id == id)
    // update user (handle case: null || old value)
    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname
    }
    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname
    }

    res.json({
        message: 'update ok',
        user: updateUser,
        indexUpdated: selectedIndex
    })
    // add updated user to users

    res.send(selectedIndex + '')
});

app.delete('/users/:id', (req, res) => {
    let id = req.params.id

    // Find the user with the id
    let selectedIndex = users.findIndex(user => user.id == id)
    // delete user from users
    delete users[selectedIndex]

    res.json({
        message: 'delete ok',
        indexDeleted: selectedIndex
    })
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})