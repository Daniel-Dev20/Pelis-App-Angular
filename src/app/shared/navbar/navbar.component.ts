import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

//AOS
import  * as AOS from 'aos';
import 'aos/dist/aos.css'; 
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { uiReducer } from '../ui.reducer';
import { isLoading } from '../ui.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('navbar', {static:true}) navbar:ElementRef;

  userAuth = localStorage.getItem('email');

  role:any;

  usuario:any;

  subscription:Subscription;

  role2:string;

  constructor(

    @Inject(DOCUMENT) private document:Document,

    private authService:AuthService,

    private router:Router,

    private store:Store<AppState>

    ) {


      this.subscription = this.store.select('user').subscribe(user =>  {
        
        
        this.usuario = {...user.user} 

        console.log('tt', this.usuario);
        
      
      
      })
     
          
     }

   ngOnInit() {

   

    
    // this.initialAnimation();
    AOS.init();

   
  }
  ngOnDestroy(){

    // this.authService.initAuthListener();

    this.subscription.unsubscribe();

  }



  logout = () => {

    this.authService.logout().then( () => {

      this.router.navigateByUrl('/login')



    })
 }





}
