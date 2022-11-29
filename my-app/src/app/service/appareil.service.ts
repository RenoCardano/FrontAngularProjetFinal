import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn : 'root'
})

export class AppareilService {


  appareilSubject = new Subject<any []>();

  constructor(private httpclient : HttpClient) {}

  url ="https://httpclientdemo-7c984-default-rtdb.europe-west1.firebasedatabase.app/"

  saveAppareilToServeur(){
    this.httpclient.put("https://httpclientdemo-7c984-default-rtdb.europe-west1.firebasedatabase.app/appareils.json", this.appareils)
      .subscribe(
        () => {
          console.log("enregistrement terminé")
        },
        (error) => {
          console.log("erreur de sauvegarde")
        }
      )
  }

  getAppareilsFromServeur() {
    this.httpclient.get<any[]>("https://httpclientdemo-7c984-default-rtdb.europe-west1.firebasedatabase.app/appareils.json")
      .subscribe(
        (response) => {
          // @ts-ignore
          this.appareils = Object.keys(response).map(function(cle) {
            // @ts-ignore
            return [Number(cle), response[cle]];
          });

          this.emitAppareilSubject();
        },
        (error) => {
          console.log("erreur de fetch")
        }

      )

  }


  private appareils = [];

  emitAppareilSubject () {
      // @ts-ignore
    this.appareilSubject.next(this.appareils[0][1].slice())
  }

  swithOnAll(){
    for(let appareil of this.appareils){
      // @ts-ignore
      appareil.status = "allumé";
    }
    this.emitAppareilSubject();
  }

  swithOffAll(){
    for(let appareil of this.appareils){
      // @ts-ignore
      appareil.status = "éteint";
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index :number){
    // @ts-ignore
    this.appareils[index].status = "allumé";
    this.emitAppareilSubject();
  }

  switchOffOne(index :number){
    // @ts-ignore
    this.appareils[index].status = "éteint";
    this.emitAppareilSubject();
  }

  getAppareilById(id : number){
    const Singleappareil = this.appareils.find(
      (appareilObject ) => {
        // @ts-ignore
        return appareilObject.id === id;
        }
      );
    this.emitAppareilSubject();
    return Singleappareil;
    };

  add(formulaire: FormGroup) {
    const appareilObject = {
      name: '',
      status: '',
      id : 0
    }
    appareilObject.name = formulaire.value.name
    appareilObject.status = formulaire.value.status
    // @ts-ignore
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    // @ts-ignore
    this.appareils.push(appareilObject);

  }
}
