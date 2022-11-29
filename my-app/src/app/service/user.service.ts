import {Subject} from "rxjs";
import {User} from "../modele/user.modele";

export class UserService {
  private users : User[] = [
    {
      firstname : 'Renaud',
      lastName : 'Vidal',
      email : 'vidalrenaud7@gmail.com',
      drinkPreference : 'Coca',
      hobbies : [
        'coder',
        'jouer de la guitare',
        'courir'
      ]
    }
  ]
  userSubject = new Subject<User[]>()

  emitUsers() {
    //permet d'emttre un copie d'un user
    this.userSubject.next(this.users.slice())
  }

  addUser(user: User) {
    this.users.push(user);
    //on met a jour les données du Suject pour eviter de taper directement dans
    // le tableau
    this.emitUsers();
  }

}
