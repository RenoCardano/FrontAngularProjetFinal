import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cours} from "../modele/cours.modele";
import {Enseignement} from "../modele/enseignement.modele";

@Injectable({
  providedIn: 'root'
})
export class EnseignementService {

  url= 'http://localhost:8081/api/enseignement'

  constructor(private http: HttpClient) { }

  findAll():Observable<Enseignement[]>{
    return this.http.get<Enseignement[]>(this.url);
  }
}
