// const chatForm = document.getElementById('chat-form');
// const messageBox = document.getElementById('messageBox');



// //Get username
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const username = urlParams.get('username');

// //keep track of which messageRoom has been selected
// var selected;


// const socket = io();

// //send username to server
// socket.emit('connectUser', username);

// //Get all message  Rooms
// getAllMessageRooms();

// //receive message rooms
// socket.on('receiveMessageRooms', (array,roomInfo) => {
//   // console.log(roomInfo);
//   // console.log(array);
//   sortDates(array, roomInfo);
//   // console.log(roomInfo);
//   // console.log(array);
//   var i = 0;
//   for(i = 0; i < array.length; i++){
//     var messageWith = array[i].messagingWith;
//     const div = document.createElement('div');
//     div.id = array[i].messageRoomId;
//     div.addEventListener("click", function() {
//       getRoomsMessages(this.id);
//     });
//     div.classList.add('messageLink');
//     const p = document.createElement('p');
//     p.innerText = array[i].messagingWith;
//     div.appendChild(p);
//     const p2 = document.createElement('p');
//     p2.innerText = `${roomInfo[i].time}   ${roomInfo[i].date}`;
//     div.appendChild(p2);


//     //check if it has unread messages
//     if(roomInfo[i].unread){
//       //change color of div background
//       div.style.backgroundColor = 'red';
//     }

//     document.getElementById('messageLinks').appendChild(div);
//   }
// })

// socket.on('receiveMessagesFromRoom', messages => {
//   messageBox.innerHTML = '';
//   var i = 0;
//   for(i=0; i < messages.length; i++){
//     const div = document.createElement('div');
//     div.classList.add('message');
//     const p = document.createElement('p');
//     p.classList.add('meta');
//     p.innerText = messages[i].sender;
//     div.appendChild(p);
//     const p2 = document.createElement('p');
//     p2.innerHTML = ` ${messages[i].timeSent}   ${messages[i].dateSent}`;
//     div.appendChild(p2);
//     const para = document.createElement('p');
//     para.classList.add('text');
//     para.innerText = messages[i].message;
//     div.appendChild(para);
//     document.querySelector('.messageBox').appendChild(div);
//   }
// });

// //incoming update of messages
// socket.on('updateMessagesToUser', (roomId, formattedMessage, name, unread) =>{
  
//   var room = document.getElementById(roomId);
//   if(room){

//     //room is in list of rooms
//     if(room === selected){
//       const div = document.createElement('div');
//       div.classList.add('message');
//       const p = document.createElement('p');
//       p.classList.add('meta');
//       p.innerText = formattedMessage.sender;
//       div.appendChild(p);
//       const p2 = document.createElement('p');
//       p2.innerHTML = ` ${formattedMessage.timeSent}   ${formattedMessage.dateSent}`;
//       div.appendChild(p2);
//       const para = document.createElement('p');
//       para.classList.add('text');
//       para.innerText = formattedMessage.message;
//       div.appendChild(para);
//       document.querySelector('.messageBox').appendChild(div);
      
     
//     }else{
//       room.style.backgroundColor = 'red';
//     }
//     //change time on room Link
//     room.childNodes[1].innerHTML = ` ${formattedMessage.timeSent}   ${formattedMessage.dateSent}`
    
    
//   }else{
//     // const div = document.createElement('div');
//     // div.id = roomId;
//     // div.addEventListener("click", function() {
//     //   getRoomsMessages(this.id);
//     // });
//     // div.classList.add('messageLink');
//     // const p = document.createElement('p');
//     // p.innerText = name;
//     // div.appendChild(p);
//     // const p2 = document.createElement('p');
//     // p2.innerHTML = ` ${formattedMessage.timeSent}   ${formattedMessage.dateSent}`;
//     // div.appendChild(p2);
//     // document.getElementById('messageLinks').appendChild(div);
//     location.reload();

    
//   }
// });






// // Message submit
// chatForm.addEventListener('submit', e => {
//     e.preventDefault();
  
//     // Get message text
//     let msg = e.target.elements.msg.value;
//     let receiver = e.target.elements.receiver.value;
   
    
//     //Gets rid of whitespace which i would rather not have in the final version
//     // msg = msg.trim();
    
//     if (!msg){
//       return false;
//     }
    
//     // Emit message to server
//     socket.emit('sendMessage', {receiver, msg});
  
//     // Clear input
//     e.target.elements.msg.value = '';
//     e.target.elements.receiver.value = '';
//     //focuses on submission
//     e.target.elements.msg.focus();
//   });



//   function getAllMessageRooms(){
//     socket.emit('getMessageRooms', username);
//   }

//   function getRoomsMessages(id){
    
//     selected = document.getElementById(id);
//     //change color of div because it is now read
//     var unread = false;
//     if(selected.style.backgroundColor == 'red'){
//       selected.style.backgroundColor = 'white';
//       unread = true;
//     }
    
//     console.log(id);
//     socket.emit('getMessagesFromRoom', id, unread);
//   }






//  function sortDates(array, roomInfo){
//    datesArr = [];
//    var i;
//    for(i = 0; i < roomInfo.length; i++){
//       datesArr.push(roomInfo[i].date.concat(' ', roomInfo[i].time));
//    }

//    var i;
//    var key;
//    var j;
//    for(i = 1; i < datesArr.length; i++){
//     key = datesArr[i]; 
//     key2 = array[i];
//     key3 = roomInfo[i];
//     j = i - 1;
//     console.log(key);
//     var comp = datesArr[j] > key;
    
//      while(j >= 0 && datesArr[j] < key){
//       console.log('swapping');
//        datesArr[j + 1] = datesArr[j];
//        array[j + 1] = array[j];
//        roomInfo[j + 1] = roomInfo[j];
//        j = j - 1;
//      }
//      datesArr[j + 1] = key;
//      array[j + 1] = key2;
//      roomInfo[j + 1] = key3;
//    }
   
//  }


// pushes to top of list
function pushUp(id){
  console.log(id);
  var b = document.getElementById(id);
  var a = b.parentNode.children[0];
  var parent = b.parentNode;
  console.log(b);
  console.log(a);
  parent.insertBefore(b, a);
  
}