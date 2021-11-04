import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
export class NavbarComponent implements OnInit {

  @ViewChild('navbar', {static:true}) navbar:ElementRef;

  userAuth = localStorage.getItem('email');

  constructor(

    @Inject(DOCUMENT) private document:Document,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {

    // this.initialAnimation();
    AOS.init();
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

}
