import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './user/components/user-form/user-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'teste-ibm';

  currentYear: number;

  constructor(
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  openUserModal(): void {
    this.dialog.open(UserFormComponent, {
      width: '320px',
      maxHeight: '85%',
      autoFocus: false,
    });
  }
}
