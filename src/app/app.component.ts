import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
//import 'rxjs/Subscription';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'projet-appareil';
  isAuth = false;
  secondes: number;
  counterSubscription : Subscription;

  ngOnInit(){
  	const counter = Observable.interval(1000);
  	this.counterSubscription = counter.subscribe(
  		(value)=>{this.secondes = value;},
  		(error)=>{console.log('an error occored'+error);},
  		()=>{console.log('Observable complete !');}
  	);
  }
  ngOnDestruy(){
  	this.counterSubscription.unsubscribe();
  }
}



