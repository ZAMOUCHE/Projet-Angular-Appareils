import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User} from '../modeles/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

	users: User[];
	userSubscription: Subscription; 

  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.userSubscription = this.userService.userSubject.subscribe(
  			(users: users[])=>{
  				this.users = users;
  			}
  		);
  	this.userService.emitUsers();
  }

  ngOnDestroy(){
  	this.userSubscription.unsubscribe();
  }

}
