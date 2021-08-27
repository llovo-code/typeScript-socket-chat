const socketConstroller = (socket) => {


    console.log(`client connected`, socket.id);

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    socket.on('enviar-mensaje', (payload) => {

        socket.broadcast.emit('enviar-mensaje', payload);
    });
};


module.exports = socketConstroller;