import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(

    private serieService:AddSeriesService,
    private store:Store
    ) { 

     this.subscription =  this.serieService.obtenerSeries().subscribe( (serie:any) => {

      console.log(serie);

      this.store.dispatch(setSeries({series:serie}))
      
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  
  }

}
