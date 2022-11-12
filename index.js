const { request, response } = require('express');
const bodyParser = require('body-parser') ;         
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(
    bodyParser.json({               
        limit: '50mb' ,
    })
)

app.use(express.json());
const users = [];
app.get('/api/v1/message', (request, response) => {      
    users.push(response);
})


app.post('/api/v1/message', (request, response)=>{
   while(users.length){
    const user = users.pop();
    user.json(request.body);
   } 
   response.send(null);
})

app.listen(3000) ;