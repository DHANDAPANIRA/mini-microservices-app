const express = require('express');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const res = require('express/lib/response');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts); // get all the posts list
});
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
        id, title
    };
    res.status(201).send(posts[id]); //return post with title
});

app.listen('4000', () => {
console.log('listening on 4000');
});