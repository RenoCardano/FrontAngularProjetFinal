import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {AppareilService} from "../service/appareil.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.css']
})
export class EditAppareilComponent implements OnInit {
  formulaire!: FormGroup;
  isSubmited = false;

  constructor(private form : FormBuilder, private ss : AppareilService, private router : Router) { }

  ngOnInit(): void {
    this.formulaire = this.form.group({
      'status' : ['', Validators.required],
      'name' : ['', Validators.required]
    })
  }

  OnSubmit() {
    this.isSubmited = true;

    if(this.isSubmited){
      this.ss.add(this.formulaire);
      this.router.navigate(['/appareils']).then(r => alert(r))
    }

  }
}
