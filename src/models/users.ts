

export class User{


    public people =[] ;
    constructor(){
        this.people=[];
    }


    addPerson(id,name,rooms){

        let person = { id,name ,rooms};
        this.people.push(person);
        return this.people;
    }

    getPersonById(id:Number){

        let person = this.people.filter(p => {return p.id ===id})[0];
        return person
    }

    getPeople(){
        return this.people;
    }

    getPeopleByRooms(rooms:any){
        

            let usersRooms = this.people.filter(p=>{
                return p.rooms ===rooms;
            })


            return usersRooms;
    }


    removePerson(id){

        let person = this.getPersonById(id); 
        this.people =  this.people.filter( p => {return p.id != id});

        return person;

    }
}