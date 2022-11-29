import { Component, OnInit } from '@angular/core';
import {AppareilService} from "../service/appareil.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  isAuth = false;

  lastUpdate = new Promise<Date>(
    (resolve, reject) => {
      const date =  new Date();
      setTimeout(() => {
          resolve(date);
        },2000
      )
    }
  )
  boolStatus = false;
  appareils: any[] = [];
  appareilSubject! : Subscription;

  constructor(private appareilService : AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 2000)
  }


  ngOnInit(): void {
  this.appareilService.appareilSubject.subscribe(
      (appareil : any[]) => {
        this.appareils = appareil
      }
    );
  this.appareilService.emitAppareilSubject();
  }

  onEteindre() {
    this.appareilService.swithOffAll()
  }

  onAllumer() {
    this.boolStatus = !this.boolStatus;
    this.appareilService.swithOnAll()
  }

  onSave() {
    this.appareilService.saveAppareilToServeur();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServeur();
  }
}
