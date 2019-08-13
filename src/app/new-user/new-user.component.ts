import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGrooup } from '@angular/forms';
import { Validators, FormArray } from '@angular/forms';
import { User } from '../modeles/User.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

	userForm: FormGrooup;

  constructor(private userService: UserService, 
  			  private router:Router, 
  			  private formBuilder: FormBuilder) { }

  ngOnInit() {
  	this.initForm();
  }

  initForm(){
  	this.userForm = this.formBuilder.group({
  		firstname:['', Validators.required],
  		lastname:['', Validators.required],
  		email:['', [Validators.required, Validators.email]],
  		drinkPreference:['', Validators.required],
  		hobbies: this.formBuilder.array([])
  	});
  }

  onSubmitForm(){
  	const formValue = this.userForm.value;
  	const newUser = new User(
  		formValue['firstname'],
  		formValue['lastname'],
  		formValue['email'],
  		formValue['drinkPreference'],
  		formValue['hobbies'] ? formValue['hobbies'] : []
  		);
  	this.userService.addUser(newUser);
  	this.router.navigate(['/users']);
  }

  getHobbies(){
  	return this.userForm.get('hobbies') as FormArray;
  }
  onAddHobby(){
  	const newHobbyControl = this.formBuilder.control(null, Validators.required);
  	this.getHobbies().push(newHobbyControl);
  }

}
