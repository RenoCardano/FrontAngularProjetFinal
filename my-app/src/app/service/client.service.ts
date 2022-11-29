
import {ClientModele} from "../modele/client.modele";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
@Injectable({
  providedIn : 'root'
})

export class ClientService {
  private clients : ClientModele[] = [];

  clientSubject = new Subject<any []>();

  constructor(private httpclient : HttpClient) {
  }

  addClient(newClient: ClientModele) {

    this.httpclient.post("http://localhost:8081/monapp/api/users/", newClient)
      .subscribe(
        () => {
          console.log("enregistrement terminé")
        },
        (error) => {
          console.log("erreur de sauvegarde")
        }
      )
  }

  getClient() {
    return this.httpclient.get<any[]>("http://localhost:8081/monapp/api/users")
      .subscribe(
        (response) => {
          this.clients = response;
          console.log(response)
          this.emitClientSubject();
        },
        (error) => {
          console.log("erreur de fetch")
        }
      )}


  emitClientSubject() {
    this.clientSubject.next(this.clients.slice())
  }
}
