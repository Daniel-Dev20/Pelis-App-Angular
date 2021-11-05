import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import {doc, collection } from '@angular/fire/firestore'
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  userSubscription:Subscription;
  constructor(
    private firestore:AngularFirestore,
    private auth: AngularFireAuth,
    ) { }


  // getUsuarios = () => {


  //   this.auth.authState.subscribe(fuser => {

  //     console.log(fuser);



  //   }

  // }

}
  