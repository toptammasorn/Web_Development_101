const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const port = 8000;

app.use(bodyparser.json());

let users = [];
let counter = 1;

// path = GET /users
app.get('/users', (req, res) => {
    const filterUsers = users.map(user => {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            fullname: user.firstname + ' ' + user.lastname
        }
    })
    res.json(filterUsers)
})

// path = POST /users
app.post('/users', (req, res) => {
    let user = req.body
    user.id = counter
    counter++

    users.push(user)
    res.json({
        message: 'add complete',
        user: user
    })
});

// path = GET /users by id
app.get('/users/:id', (req, res) => {
    let id = req.params.id
    // Find the user with the id
    let selectedIndex = users.findIndex(user => user.id == id)
    res.json(users[selectedIndex])
})

// path = PUT /users/:id
app.put('/users/:id', (req, res) => {
    let id = req.params.id
    let updateUser = req.body
    // Find the user with the id
    let selectedIndex = users.findIndex(user => user.id == id)
    // update user (handle case: null || old value)
    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
    users[selectedIndex].age = updateUser.age || users[selectedIndex].lastname
    users[selectedIndex].gender = updateUser.gender || users[selectedIndex].lastname

    res.json({
        message: 'update complete',
        user: updateUser,
        indexUpdate: selectedIndex
    })
    // add updated user to users

    res.send(selectedIndex + '')
});

// path = DELETE /users/:id
app.delete('/users/:id', (req, res) => {
    let id = req.params.id

    // Find the user with the id
    let selectedIndex = users.findIndex(user => user.id == id)
    // delete user from users
    users.splice(selectedIndex, 1)

    res.json({
        message: 'delete complete',
        indexDeleted: selectedIndex
    })
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})