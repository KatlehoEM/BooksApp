import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { SharedModule } from './_modules/shared.module';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { ConfirmDeleteModalComponent } from './modals/confirm-delete-modal/confirm-delete-modal.component';
import { BookAddComponent } from './books/book-add/book-add.component';
import { FeaturesComponent } from './features/features.component';
import { PricingComponent } from './pricing/pricing.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ContactComponent,
    RegisterComponent,
    BookListComponent,
    BookDetailsComponent,
    BookEditComponent,
    ConfirmDeleteModalComponent,
    BookAddComponent,
    FeaturesComponent,
    PricingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
