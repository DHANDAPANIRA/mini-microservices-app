const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts ={};

app.get('/posts', (req, res) => {
    res.send(posts);
 });


app.post('/events', (req, res) => { 
    const { type, data } = req.body;
    
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = {id, title, comments: [] };
    }

    if(type === 'CommentCreated'){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }
    
    if(type === 'CommentUpdated') {
        const {id, content, postId, status} = data;

        const post = posts[postId];  // find the post which was updated
        const comment = post.comments.find(comment => {
            return comment.id === id;  // find the comment which was updated
        });
        comment.status = status;
        comment.content = content;
    }

    console.log(posts);

    res.send({}); //add send response otherwise request going to hang
});


app.listen(4002, () => {
    console.log('listening on 4002');
});