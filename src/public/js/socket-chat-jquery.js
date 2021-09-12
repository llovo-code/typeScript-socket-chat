//referncias
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let textareaMessage = $('#textareaMessage');
let divChatbox = $('#divChatbox');


function renderUsers(users) {

    let html = '';
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('rooms') + '</span></a>';
    html += '</li>';
    for (let p = 0; p < users.length; p++) {

        html += '<li>';
        html += '    <a data-id="' + users[p].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + users[p].name + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }
    divUsuarios.html(html);
}

function renderChats(data, owner) {

    var date = new Date(data.date);
    var hour = date.getHours() + ':' + date.getMinutes();
    var html = '';

    if (owner) {
        html += '<li class="reverse animated fadeIn">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + data.name + '</h5>';
        html += '        <div class="box bg-light-inverse">';
        html += '            ' + data.message + '';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="chat-img">';
        html += '        <img src="assets/images/users/5.jpg" alt="user" />';
        html += '    </div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';
    } else {
        html += '<li class ="animated fadeIn">';
        html += '    <div class="chat-img">';
        html += '        <img src="assets/images/users/1.jpg" alt="user" />';
        html += '    </div>';
        html += '    <div class="chat-content">';
        html += '        <h5>' + data.name + '</h5>';
        html += '        <div class="box bg-light-info">';
        html += '            ' + data.message + ' ';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';
    }
    divChatbox.append(html);
}




function scrollBottom() {
    //selectores
    var newMessage = divChatbox.children('li:last-child');

    var clietHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMesssageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;
    if (clietHeight + scrollTop + newMesssageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }

}


///listener 
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    console.log(id);
});


formEnviar.on('submit', function(e) {
    e.preventDefault();
    if (textareaMessage.val().trim().length === 0) {
        return;
    }
    const payload = { name: data.name, message: textareaMessage.val().trim() }
    socket.emit('sendMessage', payload, (resp) => {
        renderChats(resp, true);
        scrollBottom();
        textareaMessage.val('').focus();
    });
});