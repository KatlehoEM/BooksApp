import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  model: any = {}
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
  }

  getCurrentUser(){
    this.accountService.currentUser$
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/books');
        this.model = {}
      },
      error: error => {
        if(error.status == 401){
          this.toastr.error('Unauthorised', error.status.toString());
        }
      }
    })
  }

  loginDemo() {
    this.model.username = 'thabo';
    this.model.password = 'Pa$$w0rd';
    this.login();
  }

  logOut(){
    this.accountService.logOut();
    this.router.navigateByUrl('/');
  }

}
