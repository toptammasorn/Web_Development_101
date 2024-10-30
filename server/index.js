const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.json());

const port = 8000;

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
    res.send(req.body);
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})