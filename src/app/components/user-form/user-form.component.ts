import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { phoneValidator } from 'src/app/utils/phone-validator';
import { User } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private matDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator()]],
      birthDate: ['', [Validators.required]],
      role: ['', Validators.required]
    });
    if (this.data) {
      this.userForm.get('id')?.setValue(this.data.id);
      this.userForm.get('name')?.setValue(this.data.name);
      this.userForm.get('email')?.setValue(this.data.email);
      this.userForm.get('phone')?.setValue(this.data.phone);
      this.userForm.get('birthDate')?.setValue(this.data.birthDate);
      this.userForm.get('role')?.setValue(this.data.role);
    } else {
      this.userForm.get('id')?.setValue(this.userService.generateId());
    }
  }

  handleUserData(): void {
    const action = this.data ? this.userService.updateUser : this.userService.addUser;
    action.call(this.userService, this.userForm.value);
    this.closeModal();
  }

  closeModal(): void {
    this.userForm.reset();
    this.matDialogRef.close();
  }

}
