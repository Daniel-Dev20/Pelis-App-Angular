import { Component, OnInit } from '@angular/core';

//Librerias para animaciones
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';


import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


gsap.registerPlugin(ScrollTrigger)


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor(
  
    private authService:AuthService,
    private router:Router
  
  ) { }

  ngOnInit(): void {

  }





}
