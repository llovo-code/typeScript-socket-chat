
import { Socket } from "socket.io";
import { User } from '../models/users';
import { ioserver } from "../server/server";
import createMessage from "../server/utils/utils";



const userdb = new User();

ioserver.on('connection',(client:Socket)=>{


    client.on('entryChat',(data,callback)=>{

        if(!data.name){
            return callback({
                error :true,
                message: 'The name/rooms is necesary'
            });
        }
        client.join(data.rooms);
        userdb.addPerson(client.id,data.name,data.rooms);
        client.broadcast.to(data.rooms).emit('listPerson',userdb.getPeopleByRooms(data.rooms));
        callback(userdb.getPeopleByRooms(data.sala));

    }); 
 
    client.on('disconnect',()=>{

        let deletePerson = userdb.removePerson(client.id);
        client.broadcast.emit('createMessage',createMessage('Admin',`${deletePerson.name} abandono el chat`));
        client.broadcast.to(deletePerson.rooms).emit('listPerson',userdb.getPeopleByRooms(deletePerson.rooms));

    });


    client.emit('enviarMensaje',{
        usuario:'Admin',
        message:'Bienvenido a la  aplicacion'
    });
 

    // client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     client.broadcast.emit('enviarMensaje', data);


    //     // if (mensaje.usuario) {
    //     //     callback({
    //     //         resp: 'TODO SALIO BIEN!'
    //     //     });

    //     // } else {
    //     //     callback({
    //     //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     //     });
    //     // }


    // });

    client.on('sendMessage',(data)=>{

        let person = userdb.getPersonById(data.id);

        let message = createMessage(person.name,data.message);
        client.broadcast.to(person.rooms).emit('sendMessage',message);
    });


    
    client.on('MessagePrivate',(data)=>{

        let user = userdb.getPersonById(client.id);
        client.broadcast.to(data.destiny).emit('MessagePrivate',createMessage(user.name,data.message));
    })
});




//private messsage
