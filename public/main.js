
const USER_ID =         
Math.random().toString(36).replace('0.', 'some_id') +
Math.random().toString(36).replace('0.', '') +
Math.random().toString(36).replace('0.', '') +
Math.random().toString(36).replace('0.', '');


async function getMessage(){
    while(true){                        
        await fetch('/api/v1/message') 
        .then((e)=>e.json())      
        .then((data)=>{
           const messageWrapper = document.createElement('div');       
           messageWrapper.className = 'message-wrapper';               
            if(data.USER_ID === USER_ID){                           
                messageWrapper.setAttribute('isMy', true);
            }
            if(data.type === 'img'){                                
                messageWrapper.innerHTML = `<img src="${data.body}"/>`;
            }else{
                messageWrapper.innerHTML=`<p>${data.body}</p>`;                
            }  
                   chat.appendChild(messageWrapper);                               
        })  
        .catch((e)=> console.log(e))    
    }
 }
getMessage();      

function sendMessage(text, type = 'text')  {            
fetch('/api/v1/message',{                              
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
    USER_ID,        
    type,
    body:text,
}),
}).catch((e)=> console.log(e))      
}

document.querySelector('form').addEventListener('submit', e =>{     
e.preventDefault();          
sendMessage(e.target['text'].value);     
e.target['text'].value = '';
})

document.body.addEventListener('dragover', (e) => e.preventDefault());                                 
document.body.addEventListener('drop', (e) => {                                                    
e.preventDefault();
if(e.dataTransfer.files.length){                
const type = e.dataTransfer.files[0].type.toLowerCase();            
if(type.includes('jpg') || type.includes('jpeg') || type.includes('png')) {                       
const reader = new FileReader ();                                                                 
reader.onload = function(){
    sendMessage(reader.result, 'img')                       
}

reader.readAsDataURL(e.dataTransfer.files[0]);              
return;
}
}
alert('bad file');
})