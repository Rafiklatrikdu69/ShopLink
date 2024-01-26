import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiSymfonyService {

  constructor(private http:HttpClient) { }

  public getJson(){
    return this.http.get("http://127.0.0.1:8000/home");
  }
}
