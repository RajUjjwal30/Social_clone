//send a request for connection
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }
    }

//this 'connectionHandler' will have to and fro interaction b/w server/observer to subscriber/user.

    connectionHandler(){
        this.socket.on('connect', function(){
            console.log('connection established using socket..!');
        });
    }

    
}