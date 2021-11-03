import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { loginForm } from '../models/loginForm';
import { registroForm } from '../models/registro-form';
import { Usuario } from '../models/usuario.model';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private firestore:AngularFirestore,
    private auth: AngularFireAuth
    ) { }


    initAuthListener = () => {

      this.auth.authState.subscribe(fuser => {

        console.log(fuser);
        
      })
    }

    crearUsuario = (usuario:registroForm) => {

      const {nombre,correo, password, } = usuario;

      console.log(nombre, correo, password);
      

      return this.auth.createUserWithEmailAndPassword( correo, password).then( ({user}) => {


        const newUser = new Usuario(user?.uid, nombre, correo);

        return this.firestore.doc(`usuarios/${user?.uid}`).set({...newUser});

      })
    }


    login = (usuario:loginForm) => {

      const {correo, password} = usuario;

     return  this.auth.signInWithEmailAndPassword(correo, password).then( () => {

        localStorage.setItem('email', correo);
     })

    }

    logout = () => {


      return this.auth.signOut();
    }

   

    isAuth = () => {

      return this.auth.authState.pipe(

        map( fbuser => fbuser != null)
      )
    }
}
