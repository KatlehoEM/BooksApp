import { Injectable, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
 
   constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
 
   login(model: any){
     return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
       map((response: User) => {
         const user = response;
         if(user){
           this.setCurrentUser(user)
         }
       })
     )
   }

   register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register',model).pipe(
      map(user => {
        if(user) {
          this.setCurrentUser(user);
        }
      })
    )
   }
 
   setCurrentUser(user: User){
    localStorage.setItem('user',JSON.stringify(user))
    this.currentUserSource.next(user);
   }
 
   logOut(){
     localStorage.removeItem('user');
     this.currentUserSource.next(null)
   }
 }
 
