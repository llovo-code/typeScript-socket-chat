//references to html

const socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('rooms')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

let data = {
    name: params.get('name'),
    rooms: params.get('rooms')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entryChat', data, function(serverResponse) {
        console.log(serverResponse);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('sendMessage', function(mensaje) {
    console.log('Servidor:', mensaje);
});

socket.on('listPerson', (data) => {
    console.log(data);
});


socket.on('createMessage', (message) => {
    console.log(message);
})







////private message 

socket.on('MessagePrivate', function(message) {
    console.log(`private message`, message);
})