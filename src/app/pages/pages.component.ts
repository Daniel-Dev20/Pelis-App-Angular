import { Component, OnDestroy, OnInit } from '@angular/core';

//Librerias para animaciones
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';


import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';


gsap.registerPlugin(ScrollTrigger)


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit, OnDestroy {


  usuario:any;


  subscription:Subscription;

  constructor(
  
    private router:Router,

    private store:Store<AppState>
  
  ) { }

  ngOnInit(): void {

    this.subscription =   this.store.select('user').subscribe(user =>  this.usuario = user.user )
   
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }





}
