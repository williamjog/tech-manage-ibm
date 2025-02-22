import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../../../interfaces/user.interface';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceMock: any;
  let matDialogMock: any;

  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      birthDate: new Date('1990-01-01'),
      role: 'Administrador'
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '987654321',
      birthDate: new Date('1985-06-15'),
      role: 'Visualizador'
    }
  ];

  beforeEach(async () => {
    userServiceMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of(users)),
      deleteUser: jasmine.createSpy('deleteUser')
    };

    matDialogMock = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent
      ],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should assign users$ from userService.getUsers on init', () => {
    expect(userServiceMock.getUsers).toHaveBeenCalled();
    component.users$.subscribe(result => {
      expect(result).toEqual(users);
    });
  });

  describe('getUserAge', () => {
    it('should calculate the correct age when birthDate is valid', () => {
      const birthDate = new Date('1990-01-01');
      const today = new Date();
      let expectedAge = today.getFullYear() - birthDate.getFullYear();
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ) {
        expectedAge--;
      }
      const age = component.getUserAge(birthDate);
      expect(age).toEqual(expectedAge);
    });

    it('should log an error and return undefined if birthDate is invalid', () => {
      spyOn(console, 'error');
      const age = component.getUserAge(undefined);
      expect(console.error).toHaveBeenCalledWith('A data de nascimento está inválida!');
      expect(age).toBeUndefined();
    });
  });

  describe('updateUser', () => {
    it('should open dialog with UserFormComponent and correct configuration', () => {
      const user = users[0];
      component.updateUser(user);
      expect(matDialogMock.open).toHaveBeenCalled();
      const dialogConfig = matDialogMock.open.calls.mostRecent().args[1];
      expect(dialogConfig.data).toEqual(user);
      expect(dialogConfig.width).toBe('80%');
      expect(dialogConfig.height).toBe('85%');
      expect(dialogConfig.autoFocus).toBeFalse();
    });
  });

  describe('deleteUser', () => {
    it('should call userService.deleteUser with the given user', () => {
      const user = users[0];
      component.deleteUser(user);
      expect(userServiceMock.deleteUser).toHaveBeenCalledWith(user);
    });
  });

});