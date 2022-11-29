import { Component, OnInit } from '@angular/core';
import {AppareilService} from "../service/appareil.service";
import {ActivatedRoute} from "@angular/router";
import {interval, Observable} from "rxjs";


@Component({
  selector: 'app-singleappareil',
  templateUrl: './singleappareil.component.html',
  styleUrls: ['./singleappareil.component.css']
})
export class SingleappareilComponent implements OnInit {

  name : string ="Appareil";
  status : string = "Status";
  public secondes : number = 0;

  constructor(private appareilService : AppareilService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    //le snapshot permet de recuperer les données depuis la requete
    const id = this.route.snapshot.params['id'];
    // @ts-ignore
    this.name = this.appareilService.getAppareilById(+id).name;
    // @ts-ignore
    this.status = this.appareilService.getAppareilById(+id).status;


  }



}
