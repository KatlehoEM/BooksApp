import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { authGuard } from './_guards/auth.guard';
import { bookDetailsResolver } from './_resolver/book-details.resolver';
import { BookAddComponent } from './books/book-add/book-add.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { FeaturesComponent } from './features/features.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: '',
     runGuardsAndResolvers: 'always',
     canActivate: [authGuard],
     children: [
      { path: 'books', component: BookListComponent },
      { path: 'books/add', component: BookAddComponent },
      { path: 'books/:id', component: BookDetailsComponent, resolve: {book: bookDetailsResolver} },
      { path: 'books/edit/:id', component: BookEditComponent,  canDeactivate: [preventUnsavedChangesGuard] }
     ] },
  { path: '**', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
