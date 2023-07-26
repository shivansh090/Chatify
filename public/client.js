

    const form = document.getElementById("formm");
    const msgInp = document.getElementById("inpt");
    const container =document.getElementById("container");
    const socket=io()
    //const socket=new WebSocket("wss://sok.onrender.com")
    const append =(message,position,namee)=>{
    const messageElement =document.createElement('div');
    if(position!=="center"){
    const innerdiv=document.createElement('div');
    innerdiv.classList.add("who");
    innerdiv.innerHTML=namee;
    messageElement.append(innerdiv);
    }
    messageElement.append(message);
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement)
    }

    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const message=msgInp.value;
        if(message!==""){
        append(message, "right","You");
        scrolltobottom();
        socket.emit("send",message);
        msgInp.value="";
        }
    })
   const namee = prompt("Enter your name to join");

   socket.emit('new-user-joined',namee)
  
   socket.on("receive",({message,name})=>{
    const namee=name;
     append(message,"left",namee)
     scrolltobottom();
   })

   socket.on('user-joined',namee=>{
    append(namee+" joined the chat",'center',namee)
    scrolltobottom();
       })
   socket.on('left',namee=>{

    append(namee+" left", "center",namee);
    scrolltobottom();
   })

   function scrolltobottom(){
    container.scrollTop=container.scrollHeight;
   }