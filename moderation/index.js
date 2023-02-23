const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req,res ) => {
    const { type, data } = req.body;
    if(type === 'CommentCreated'){
       console.log( data.content);
       var statusUpdate ='';
       if(data.content === "orange"){
            statusUpdate ='rejected';
       }else{
            statusUpdate ='approved';
       }
       const status = statusUpdate;
       //const status = data.content.include("orange") ? 'rejected' : 'approved'; // TODO: getting error .inculede is not a function
       console.log(status);
        await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
            id : data.id,
            content: data.content,
            postId : data.postId,
            status
        }
        });
    }
    res.send({});
});


app.listen('4003', (req, res)=> {
   console.log('listening on 4003'); 
});