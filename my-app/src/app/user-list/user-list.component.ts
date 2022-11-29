import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../service/user.service";
import {User} from "../modele/user.modele";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[]  = [];
  userSubscription! : Subscription;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    //important de soucrire au suject et ajouter le on destroy
    // pour s'assurer de la destrucion des informations
    this.userService.emitUsers()
    console.log(this.users)
  }

  //quand je souscrie a un subjet pour la gestion des data je l'initialise avec les valeurs,
  //je le mets a jour a chaue modificaton, et je le détruit
  ngOnDestroy(){
  this.userSubscription.unsubscribe();
  }
}
