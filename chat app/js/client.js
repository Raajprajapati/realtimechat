const socket = io("http://localhost:8000");

const msg_area = document.getElementById("msg_area");
const input_bar =document.getElementById("input_bar");
const sender =document.getElementById("sender");
const userName = prompt("Enter your name to chat : ");

function scroller(){
      msg_area.scrollTop = msg_area.scrollHeight;

}

function showMsg(msg , pos){
    const messagePara = document.createElement("p");
    messagePara.innerText = msg;
    messagePara.classList.add(pos);
    msg_area.appendChild(messagePara);
    scroller();

}

socket.emit('newUser',userName);
socket.on('receive', data=>{
    showMsg(`${data.name}: ${data.message}`, 'left')
});

socket.on('userJoined', name =>{
    showMsg(`${name} joined the chat`, 'mid')
});

socket.on('left', name =>{
    showMsg(`${name} left the chat`, 'mid')
})

sender.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = input_bar.value;
    showMsg(`You: ${message}`, 'right');
    socket.emit("send",message);
    input_bar.value = '';
})