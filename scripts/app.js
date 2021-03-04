// dom quieries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-message');
const rooms = document.querySelector('.chat-rooms');

// add a new chatList
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim(); 
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via chatroom class
  const newName = newNameForm.name.value.trim(); 
  chatroom.updateName(newName);
  // reset the form
  newNameForm.reset();
  // show then hide the update message
  updateMessage.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMessage.innerText = '', 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(event.target.getAttribute("id"));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatroom = new Chatroom('gaming', username);
const chatUI = new ChatUI(chatList);

// get chats and render
chatroom.getChats(data => chatUI.render(data));













