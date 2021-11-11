import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEdit, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AddSeriesService } from 'src/app/services/add-series.service';
import { setSeries } from '../series.actions';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styles: [
  ]
})
export class SeriesComponent implements OnInit, OnDestroy {

   subscription:Subscription;

   series:any [] = [];

   cargando:boolean = false;

   public faTrash = faTrash;

   public faEdit = faEdit;

   public faspinner = faSpinner;
  

  constructor(

    private serieService:AddSeriesService,

    private store:Store

    ) { 

      this.cargando = true;

     this.subscription =  this.serieService.obtenerSeries().subscribe( (serie:any) => {

       
       this.series = serie;
       
       console.log(this.series);

      this.store.dispatch(setSeries({series:serie}))

      this.cargando = false;
      
    })
  }

  ngOnInit(): void {

  
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  
  }

}
