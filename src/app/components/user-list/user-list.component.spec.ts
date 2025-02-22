import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { By } from '@angular/platform-browser';

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

  it('should assign users$ from userService.getUsers on init', (done) => {
    expect(userServiceMock.getUsers).toHaveBeenCalled();
    component.users$.subscribe(result => {
      expect(result).toEqual(users);
      done();
    });
  });

  describe('getUserAge', () => {
    let consoleErrorSpy: jasmine.Spy;
  
    beforeEach(() => {
      consoleErrorSpy = spyOn(console, 'error');
    });
  
    it('should return the correct age when birthday has already passed this year', () => {
      const birthDate = new Date(new Date().getFullYear() - 25, 0, 1);
      expect(component.getUserAge(birthDate)).toBe(25);
    });
  
    it('should return the correct age when birthday is today', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
      expect(component.getUserAge(birthDate)).toBe(30);
    });
  
    it('should return the correct age when birthday is yet to come this year', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 40, today.getMonth() + 1, today.getDate());
      expect(component.getUserAge(birthDate)).toBe(39);
    });
  
    it('should return the correct age when birthday is later in the same month', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate() + 5);
      expect(component.getUserAge(birthDate)).toBe(19);
    });
  
    it('should return the correct age when birthday is tomorrow', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1);
      expect(component.getUserAge(birthDate)).toBe(17);
    });
  
    it('should return undefined and log error when birthDate is undefined', () => {
      expect(component.getUserAge(undefined)).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith('A data de nascimento está inválida!');
    });
  
    it('should return undefined and log error when birthDate is not a Date instance', () => {
      expect(component.getUserAge('invalid' as unknown as Date)).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith('A data de nascimento está inválida!');
    });
  });
  

  describe('updateUser', () => {
    it('should open dialog with UserFormComponent and correct configuration', () => {
      const user = users[0];
      component.updateUser(user);
      expect(matDialogMock.open).toHaveBeenCalled();
      const dialogConfig = matDialogMock.open.calls.mostRecent().args[1];
      expect(dialogConfig.data).toEqual(user);
      expect(dialogConfig.width).toBe('300px');
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

  it('should render user cards correctly', () => {
    const userCards = fixture.debugElement.queryAll(By.css('.card'));
  
    expect(userCards.length).toBe(2);
    
    expect(userCards[0].nativeElement.textContent).toContain('John Doe');
    expect(userCards[1].nativeElement.textContent).toContain('Jane Doe');
  });

});