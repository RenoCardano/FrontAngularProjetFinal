import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SalleClasse} from "../modele/salleclasse.modele";

@Injectable({
  providedIn: 'root'
})
export class SalleClasseService {

  url= 'http://localhost:8081/api/salleclasse'

  constructor(private http: HttpClient) { }

  findAll():Observable<SalleClasse[]>{
    return this.http.get<SalleClasse[]>(this.url);
  }
}
