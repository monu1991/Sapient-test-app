import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {} from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseAPI = "https://api.spacexdata.com/v3/launches?limit=100";

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private currentLocale = new BehaviorSubject<string>("en");
  constructor(@Inject(LOCALE_ID) private locale, private http:HttpClient) { };

  setLocale(){
    if(this.locale === "bn"){
      this.currentLocale.next("bn"); 
    } else if(this.locale === "en"){
      this.currentLocale.next("en");
    } else{
      this.currentLocale.next("en");
    }
  }

  getLocale(){
    return this.currentLocale.asObservable();
  }  

  getFoods() {
    return this.http.get(baseAPI);
  }
}
