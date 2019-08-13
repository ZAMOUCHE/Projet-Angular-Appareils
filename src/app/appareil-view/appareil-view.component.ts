import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

isAuth = false;

Appareils: any[];
appareilsSubscription: Subscription;
 
  constructor(private appareilService: AppareilService) {
  	setTimeout(
      () => {
        this.isAuth = true;
      }, 2000
    );
  }

  ngOnInit(){
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (Appareils: any[]) => {
        this.Appareils = Appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }
  
  onAllumer(){
  	this.appareilService.switchOnAll();
  }
  onEteindre(){
    //if (comfirm('etes vous sur de vouloir eteindre tout les appareils' )) {
      this.appareilService.switchOffAll();
    //}else{
      //return null;
    //}
  }

  onSave(){
    this.appareilService.saveAppareilsToServer();
  }

  onFetch(){
    this.appareilService.getAppareilsToServer();
  }

   ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }
}
