import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'teste-ibm';

  constructor(
    private dialog: MatDialog
  ) {}

  openUserModal(): void {
    this.dialog.open(UserFormComponent, {
      width: '300px',
      height: '85%',
      autoFocus: false,
    });
  }
}
