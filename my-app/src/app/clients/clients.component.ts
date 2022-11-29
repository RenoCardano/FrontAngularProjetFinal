import { Component, OnInit } from '@angular/core';

import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router"
import {ClientModele} from "../modele/client.modele";
import {ClientService} from "../service/client.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clientForm! : FormGroup;
  isSubmited = false;
  clientSubject! : Subscription;
  clients: any[] = [];

  constructor(private formBuilder : FormBuilder,
              private clientService : ClientService,
              private router : Router ) { }

  ngOnInit(): void {
    this.clientService.clientSubject.subscribe(
      (clients : any[]) => {
        this.clients = clients;
        console.log('dans client')
        console.log((this.clients))
     }
    );
   // this.clientService.emitClientSubject();
    this.initForm();
  }

  private initForm() {
    this.clientForm = this.formBuilder.group({
      username : ['', Validators.required]
    })
  }
  onSubmit() {
    const formValue = this.clientForm.value;
    const newClient = new ClientModele(
      formValue['username']
    );
    console.log(newClient)
    this.clientService.addClient(newClient);
  }

  get() {
    this.clientService.getClient();
  }
}
