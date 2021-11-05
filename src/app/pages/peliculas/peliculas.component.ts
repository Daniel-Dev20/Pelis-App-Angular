import { Component, OnInit } from '@angular/core';
import { AddPeliculasService } from 'src/app/services/add-peliculas.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styles: [
  ]
})
export class PeliculasComponent implements OnInit {

  constructor(private peliculaService:AddPeliculasService) { }

  ngOnInit(): void {

    this.peliculaService.obtenerPeliculas().subscribe(resp => {

      console.log(resp);
      
    })
  }

}
