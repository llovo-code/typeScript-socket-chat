

export class User{


    public people =Array() ;
    constructor(){
        this.people=[];
    }


    addPerson(id:string,name:string,rooms:string){

        let person= { id,name ,rooms};
        this.people.push(person);
        return this.people;
    }

    getPersonById(id:string){

        let person = this.people.filter(p => {return p.id ===id})[0];
        return person
    }

    getPeople(){
        return this.people;
    }

    getPeopleByRooms(rooms:string){
        

            let usersRooms = this.people.filter(p=>{
                return p.rooms ===rooms;
            })


            return usersRooms;
    }


    removePerson(id:string){

        let person = this.getPersonById(id); 
        this.people =  this.people.filter( p => {return p.id != id});

        return person;

    }
}