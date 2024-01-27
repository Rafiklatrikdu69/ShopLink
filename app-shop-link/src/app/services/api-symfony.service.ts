import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class ApiSymfonyService {
  
  constructor(private http:HttpClient) { }
  url="http://127.0.0.1:8000/";
  public getJson(){
    return this.http.get("http://127.0.0.1:8000/home");
  }
  postUser(user :User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(JSON.stringify(user))
    return this.http.post(this.url+'connexion',  JSON.stringify(user) , { headers, responseType: "json", withCredentials: false });
  }

  inscription (user:User){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(JSON.stringify(user))
    return this.http.post(this.url+'inscription',  JSON.stringify(user) , { headers, responseType: "json", withCredentials: false });
  }
  

}
