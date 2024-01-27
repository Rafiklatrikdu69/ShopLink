import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiSymfonyService {
  
  constructor(private http:HttpClient) { }
  url="http://127.0.0.1:8000/";
  public getJson(){
    return this.http.get("http://127.0.0.1:8000/home");
  }
  postUser() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post('http://localhost:8000/connexion',  JSON.stringify({"foo": "bar"}) , { headers, responseType: "json", withCredentials: false });
  }
  

}
