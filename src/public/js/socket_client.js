//references to html

const lblOnline = document.querySelector('#lbl_Online');
const lblOfline = document.querySelector('#lbl_Ofline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnSend = document.querySelector('#btnSend');

const socketClient = io();

socketClient.on('connect', () => {
    //console.log(`connected to server`);

    lblOfline.style.display = 'none';
    lblOnline.style.display = ''
});


socketClient.on('disconnect', () => {
    //console.log(`disconnet from server `);


    lblOfline.style.display = '';
    lblOnline.style.display = 'none'
});


socketClient.on('enviar-mensaje', (payload) => {
    console.log(``, payload);
});


btnSend.addEventListener('click', () => {
    const sms = txtMensaje.value;

    const payload = {
        id: 'abc123',
        sms,
        date: new Date().getDate()
    };
    ///console.log(`${sms}`);
    socketClient.emit('enviar-mensaje', payload);
})