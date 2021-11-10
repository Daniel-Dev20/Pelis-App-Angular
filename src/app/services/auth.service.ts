import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { loginForm } from '../models/loginForm';
import { registroForm } from '../models/registro-form';
import { Usuario } from '../models/usuario.model';
import {map} from 'rxjs/operators'


//NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { unsetPeliculas } from '../pages/peliculas.actions';
import { unsetSeries } from '../pages/series.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public userSubscription:Subscription;

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



    initAuthListener = async() => {

       return  this.auth.authState.subscribe( fuser => {


        if(fuser){

          //existe
           return  this.userSubscription =  this.firestore.doc(`usuarios/${fuser.uid}`).valueChanges()
              .subscribe((fireuser:any) => {


                const user =  Usuario.fromFirebase(fireuser)

                this.store.dispatch(authActions.setUser({user}))

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

      const {nombre,correo, password, role } = usuario;

      console.log(nombre, correo, password);
      

      return this.auth.createUserWithEmailAndPassword( correo, password).then( ({user}) => {


        const newUser = new Usuario(user?.uid, nombre, correo, role);

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

      this.store.dispatch(unsetPeliculas());

      this.store.dispatch(unsetSeries());

      // this.store.dispatch(authActions.unsetUser());

      return this.auth.signOut();


    }

   

    isAuth = () => {

      return this.auth.authState.pipe(

        map( fbuser => fbuser != undefined)
      )
    }
}
