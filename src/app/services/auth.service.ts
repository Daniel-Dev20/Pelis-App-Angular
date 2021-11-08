import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { loginForm } from '../models/loginForm';
import { registroForm } from '../models/registro-form';
import { Usuario } from '../models/usuario.model';
import {map} from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userSubscription:Subscription;

  public _userRole:any;

  get getuserRole(){

    return this._userRole
  }

  constructor(

    private firestore:AngularFirestore,
    private auth: AngularFireAuth,
    private store:Store<AppState>
    ) {

     }


    getUser = () => {

      return  console.log( 'mm', this.auth.currentUser);
    }

    initAuthListener = () => {

       return  this.auth.authState.subscribe( fuser => {

        console.log(fuser);

        if(fuser){

          //existe
           return  this.userSubscription =   this.firestore.doc(`usuarios/${fuser.uid}`).valueChanges()
              .subscribe((fireuser:any) => {

                console.log(fireuser);

                const user =  Usuario.fromFirebase(fireuser)

                this.store.dispatch(authActions.setUser({user}))

                const {role} = fireuser;
                console.log('roleee', role);

                this._userRole = role;

                return fireuser;
              })
        }else{

          //no exist

          this.userSubscription.unsubscribe(); 
          this.store.dispatch(authActions.unsetUser());

        }

        
      })
    }

    crearUsuario = (usuario:registroForm) => {

      const {nombre,correo, password } = usuario;

      console.log(nombre, correo, password);
      

      return this.auth.createUserWithEmailAndPassword( correo, password).then( ({user}) => {


        const newUser = new Usuario(user?.uid, nombre, correo);

        localStorage.setItem('email', correo)

        return this.firestore.doc(`usuarios/${user?.uid}`).set({...newUser});

      })
    }


    login = (usuario:loginForm) => {

      const {correo, password} = usuario;

      localStorage.setItem('email', correo)
     return  this.auth.signInWithEmailAndPassword(correo, password);

    }

    logout = () => {

      localStorage.removeItem('email');

      return this.auth.signOut();
    }

   

    isAuth = () => {

      return this.auth.authState.pipe(

        map( fbuser => fbuser != undefined)
      )
    }
}
