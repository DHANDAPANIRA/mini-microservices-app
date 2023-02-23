const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event); // store all events in event bus for later processing, incase query service is failed to connect the process later

    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log(err.message);
      });

    res.send({status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events); // store all events in event bus for later processing, incase query service is failed to connect the process later
});

app.listen(4005, () => {
    console.log('listening on port 4005'); 
});
