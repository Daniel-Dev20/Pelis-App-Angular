

export class Usuario{

    static fromFirebase({correo, nombre,  uid} : {correo:any, nombre:any, uid:any}){

        return new Usuario(uid, nombre, correo)
    }

    constructor(

        public uid:any,
        public nombre:string,
        public correo:string,
    ){}
}