import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  localAuth : boolean = false;

  constructor(private authService : AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.localAuth = this.authService.isAuth;
  }

  signIn(){
    this.authService.signIn().then(
      () => {
        this.localAuth = this.authService.isAuth;
        this.router.navigate(['appareils']);
      }
    );
  }

  signOut() {
    this.authService.signOff();
    this.localAuth = this.authService.isAuth;
  }

}
