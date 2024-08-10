import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  constructor(private http: HttpClient) { }

  schemeList(){
    return this.http.get<any[]>(`http://localhost:3000/scheme/`)
  }

  searchScheme(query: string) {
    return this.http.get<any[]>(`http://localhost:3000/scheme?category=${query}`)
  }
  searchIdScheme(query: string) {
    return this.http.get<any[]>(`http://localhost:3000/scheme?id=${query}`)
  }
  searchGenderScheme(query: string) {
    return this.http.get<any[]>(`http://localhost:3000/scheme?gender=${query}`)
  }

  addSceheme(data: any) {
    return this.http.post("http://localhost:3000/scheme", data)
  }

  message(data: any) {
    return this.http.post("http://localhost:3000/message", data)
  }

  messageList(){
    return this.http.get<any[]>(`http://localhost:3000/message/`)
  }
}
