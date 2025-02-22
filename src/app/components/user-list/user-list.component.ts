import { MatDialog } from '@angular/material/dialog';
import { User } from './../../../interfaces/user.interface';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  getUserAge(userBirthDate: Date | undefined): number | void {
    if (userBirthDate instanceof Date) {
      const today = new Date();
      let age = today.getFullYear() - userBirthDate.getFullYear();
      const mesNascimento = userBirthDate.getMonth();
      const mesAtual = today.getMonth();
      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && today.getDate() < userBirthDate.getDate())) {
        age--;
      }
      return age;
    }
    console.error('A data de nascimento está inválida!');
  }

  updateUser(user: User): void {
    this.dialog.open(UserFormComponent, {
      width: '50%',
      height: '85%',
      autoFocus: false,
      data: user
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }

}
