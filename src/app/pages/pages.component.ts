import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

//Librerias para animaciones
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import  * as AOS from 'aos';
import 'aos/dist/aos.css'; 


gsap.registerPlugin(ScrollTrigger)


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  @ViewChild('navbar', {static:true}) navbar:ElementRef;
  @ViewChild('title', {static:true}) title:ElementRef;

  constructor(@Inject(DOCUMENT) private document:Document) { }

  ngOnInit(): void {

    this.initialAnimation();
    AOS.init();
  }


  initialAnimation = () => {

    gsap.from(this.navbar.nativeElement.childNodes, {
      duration:1,
      opacity: 0,
      y:-20,
      stagger:0.2,
      delay:0.5
    })

   
 }
}
