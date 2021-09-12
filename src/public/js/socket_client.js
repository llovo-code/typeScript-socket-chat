let params = new URLSearchParams(window.location.search);
const socket = io();



if (!params.has('name') || !params.has('rooms')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

let data = { name: params.get('name'), rooms: params.get('rooms') };

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entryChat', data, function(serverResponse) {
        renderUsers(serverResponse);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Escuchar información
socket.on('sendMessage', function(data) {
    renderChats(data, false);
    scrollBottom();
});

socket.on('listPerson', (data) => {
    renderUsers(data);
});

socket.on('createMessage', (message) => {
    console.log(message);
});

socket.on('MessagePrivate', function(message) {
    console.log(`private message`, message);
});