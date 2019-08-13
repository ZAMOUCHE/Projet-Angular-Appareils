import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from 'src/app/services/appareil.service';

@Component({
  selector: 'app-appareil-componenet',
  templateUrl: './appareil-componenet.component.html',
  styleUrls: ['./appareil-componenet.component.scss']
})
export class AppareilComponenetComponent implements OnInit {

@Input() AppareilName: string; 
@Input() AppareilStatus: string;
@Input() index: number; 
@Input() id: number;
@Input() img: string;

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
  }

 onSwitch() {
    if(this.AppareilStatus === 'allumer') {
      this.appareilService.switchOffOne(this.index);
    } else if(this.AppareilStatus === 'éteint') {
      this.appareilService.switchOnOne(this.index);
    }
  }
  getStatus(){
  	return this.AppareilStatus;
  }
  getColor(){
  	if(this.AppareilStatus === 'allumer'){
  		return 'green';
  	}else if (this.AppareilStatus==='éteint') {
  		return 'red';
  	}
  }

}
