import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Cours} from "../modele/cours.modele";

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  url= 'http://localhost:8081/api/cours'

  constructor(private http: HttpClient) { }

  findAll():Observable<Cours[]>{
    return this.http.get<Cours[]>(this.url);
  }

  add(cours: Cours) {
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    let body = JSON.stringify(cours);
    console.log(body);
    this.http.post<Cours>(this.url, body, {headers: headers}).subscribe();
  }

  update(cours: Cours) {
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    let body = JSON.stringify(cours);
    console.log("ON UPDATE CALL");
    console.log(cours);
    this.http.put<Cours>(this.url+"/"+cours.idCours, body, {headers: headers}).subscribe(console.log);
  }

  delete(id: string) {
    this.http.delete<Cours>(this.url+"/delete/"+id).subscribe();
  }
}
