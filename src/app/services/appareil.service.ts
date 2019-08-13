import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {
  appareilsSubject = new Subject<any[]>();

  private Appareils = [
    /*{
      id: 1,
      name : 'Machine à laver',
      status : 'éteint',
      img : 'src/app/images/Machine_laver.jpg'
    },
    {
      id: 2,
      name : 'Frigo',
      status : 'allumer',
      img : 'src/app/images/Frigo.jpg'
    },
    {
      id: 3,
      name : 'telephone',
      status : 'éteint',
      img : 'src/app/images/Telephone.jpg'
    }*/
  ];

constructor(private httpClient: HttpClient){}

saveAppareilsToServer() {
    this.httpClient
      .put('https://angular-7efc0.firebaseio.com/Appareils.json', this.Appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
}
getAppareilsToServer(){
  this.httpClient
    .get<any[]>('https://angular-7efc0.firebaseio.com/Appareils.json')
    .subscribe(
      (reponse)=>{
        this.Appareils = reponse;
        this.emitAppareilSubject();
      },
      (error)=>{console.log('error ! :'+error);}
      );
}
emitAppareilSubject(){
  this.appareilsSubject.next(this.Appareils.slice());
}

addAppareil(name: string, status: string){
  const appareilObject ={
    id: 0,
    name:'',
    status:''
  };
  appareilObject.name = name;
  appareilObject.status = status;
  appareilObject.img = 'src/app/images/'+img+'.jpg';
  appareilObject.id = this.Appareils[(this.Appareils.length - 1)].id + 1;
  this.Appareils.push(appareilObject);
  this.emitAppareilSubject();
}

getAppareilById(id: number) {
    const appareil = this.Appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
}


   switchOnAll(){
    for(let appareil of this.Appareils ){
      appareil.status = 'allumer';
    }
  }


  switchOffAll(){
    for(let appareil of this.Appareils){
      appareil.status = 'éteint';
    }
  }
  

  switchOnOne(i: number){
    this.Appareils[i].status = 'allumer';
  }
  switchOffOne(i: number){
    this.Appareils[i].status = 'éteint';
  }
}
