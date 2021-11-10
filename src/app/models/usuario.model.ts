

export class Usuario{

    static fromFirebase({correo, nombre,  role,  uid} : {correo:any, nombre:any, role:any, uid:any}){

        return new Usuario(uid, nombre, correo, role)
    }

    constructor(

        public uid:any,
        public nombre:string,
        public correo:string,
        public role:string
    ){}
}