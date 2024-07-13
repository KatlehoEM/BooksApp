import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService,private toastr: ToastrService,
     private router: Router,private fb: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      email: ['',[Validators.required,Validators.email]]
    })
  }

  register(){
    const values = {...this.registerForm.value};
    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/books')
      },
      error: error => this.toastr.error('Registration error',error.status)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
