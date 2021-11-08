import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

//AOS
import  * as AOS from 'aos';
import 'aos/dist/aos.css'; 
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('navbar', {static:true}) navbar:ElementRef;

  userAuth = localStorage.getItem('email');

  role:string;

  constructor(

    @Inject(DOCUMENT) private document:Document,
    private authService:AuthService,
    private router:Router
    ) {

     

     }

   ngOnInit() {

   
    this.getUserRole();

    
    // this.initialAnimation();
    AOS.init();
  }
  ngOnDestroy(){

    // this.authService.initAuthListener();

  }

//     initialAnimation = () => {

//     gsap.from(this.navbar.nativeElement.childNodes, {
//       duration:1,
//       opacity: 0,
//       y:-20,
//       stagger:0.2,
//       delay:0.5
//     })

   
//  }

  logout = () => {

    this.authService.logout().then( () => {

      this.router.navigateByUrl('/login')



    })
 }

 getUserRole = async () => {

  this.role =  await this.authService.getuserRole;

  console.log('vvv',this.role);


}

}
