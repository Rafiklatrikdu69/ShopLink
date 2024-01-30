import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleApiService {
  url="http://127.0.0.1:8000/";
  constructor(private http:HttpClient) { }

  insert(article:Article){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(JSON.stringify(article))
    return this.http.post(this.url+'insert-article',  JSON.stringify(article) , { headers, responseType: "json", withCredentials: false });
  }
  getAllProduct(){
    return this.http.get<any>(this.url+"get-article");
  }

  deleteProduct(arr:any[]){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.url+"del-article",JSON.stringify(arr),{ headers, responseType: "json", withCredentials: false });

  }

  getLastId(){
    return this.http.get<any>(this.url+"get-last-id",{withCredentials:false})
  }
}
