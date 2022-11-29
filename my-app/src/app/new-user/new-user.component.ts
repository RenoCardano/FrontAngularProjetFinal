import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {User} from "../modele/user.modele";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm! : FormGroup;

  createHobby():FormGroup{
    return this.formBuilder.group({
      hobbie:[[''],Validators.required]
    })
  }

  constructor(private formBuilder : FormBuilder,
              private userService : UserService,
              private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      email : ['', Validators.required, Validators.email],
      drinkPreference : ['', Validators.required],
      hobbies : this.formBuilder.array([this.createHobby()],Validators.required)
    });
  }



  onSubmit() {
    const formValue = this.userForm.value;
    console.log(formValue.value)
    const newUser = new User(
      formValue['firstname'],
      formValue['lastname'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies']
    );
    this.userService.addUser(newUser)
    this.router.navigate(['/users'])
  }

  get Hobbies(): FormArray{
    return <FormArray> this.userForm.get('hobbies');
    //return this.userForm.get("hobbies") as FormArray;
  }

  addHobby() {
   // const newHobbyControl = this.formBuilder.control('', Validators.required)
    this.Hobbies.push(this.createHobby());
  }

}
