import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule} from 'ngx-bootstrap/modal';
import { PaginationModule} from 'ngx-bootstrap/pagination';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule.forRoot({
      type: 'ball-scale-pulse'
    }),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
    
  ],
  exports: [
    ToastrModule,
    NgxSpinnerModule,
    ModalModule,
    PaginationModule
  ]
})
export class SharedModule { }
