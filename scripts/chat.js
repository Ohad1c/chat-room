// adding new chat documents
// setting up a real-time listner to get new chats
// updating the username
// updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }
  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  // get document real time listner
  getChats(callback) {
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            // update the ui
            callback(change.doc.data());
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }
  updateRoom(room) {
    this.room = room;
    console.log('room updated');
    if (this.unsub) {
      this.unsub();
    }
  }

}

//const chatroom = new Chatroom('gaming', 'dan');
//
//chatroom.getChats((data) => {
//  console.log(data);
//});
//
//chatroom.updateRoom('general');
//chatroom.getChats((data) => {
//  console.log(data);
//});


//const chatroom = new Chatroom('gaming', 'dan');
//chatroom.addChat("hello everyoneeeee")
//  .then(() => {
//    console.log('chat added')
//  }).catch(err => {
//    console.log(err);
//  })
