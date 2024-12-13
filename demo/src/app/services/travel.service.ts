import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from '../models/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private baseUrl="";
  constructor(private http:HttpClient) { }
  getall():Observable<any[]>{ 
    return this.http.get<any[]>(`${this.baseUrl}`)
  }
  add(records:Travel):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`,records);
  }
  getbyid(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/search?id=${id}`);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/id=${id}`);
  }
  update(id:number,records:Travel):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/id=${id}`,records);
  }
}
