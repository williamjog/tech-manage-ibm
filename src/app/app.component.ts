import { Component, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';

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
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.renderer.removeAttribute(document.querySelector('app-root'), 'aria-hidden');
  }

  openUserModal(): void {
    this.dialog.open(UserFormComponent, {
      width: '300px',
      maxHeight: '85%',
      autoFocus: false,
    });
  }
}
