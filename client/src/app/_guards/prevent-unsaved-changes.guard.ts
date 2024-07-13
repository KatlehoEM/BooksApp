import { CanDeactivateFn } from '@angular/router';
import { BookEditComponent } from '../books/book-edit/book-edit.component';
import { inject } from '@angular/core';
import { ConfirmService } from '../_services/confirm.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<BookEditComponent> = (component) => {
  const confirmService = inject(ConfirmService)

  if(component.editForm?.dirty){
    return confirmService.confirm();
  }
  return true;
};
