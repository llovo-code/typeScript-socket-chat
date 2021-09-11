

const createMessage = (name:string, message:string)=>{

    return {
        name,message,
        date: new Date().getTime()
    }

}

export default createMessage