import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UserFormComponent } from './user-form.component';

import { of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../../services/user.service';

class MockUserService {
  generateId() {
    return '12345';
  }

  addUser(user: any) {
    return of(user);
  }

  updateUser(user: any) {
    return of(user);
  }
}

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let mockMatDialogRef: MatDialogRef<UserFormComponent>;
  let mockData: any;

  beforeEach(() => {
    mockData = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      birthDate: '1990-01-01',
      role: 'admin'
    };

    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        SharedModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useClass: MockUserService },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        UserService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with provided data', () => {
    expect(component.userForm.get('id')?.value).toBe('1');
    expect(component.userForm.get('name')?.value).toBe('John Doe');
    expect(component.userForm.get('email')?.value).toBe('john.doe@example.com');
    expect(component.userForm.get('phone')?.value).toBe('123-456-7890');
    expect(component.userForm.get('birthDate')?.value).toBe('1990-01-01');
    expect(component.userForm.get('role')?.value).toBe('admin');
  });

  it('should generate a random id in the form with no data', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'generateId').and.returnValue(12345);
  
    component.data = null as any;
    component.ngOnInit();

    expect(userService.generateId).toHaveBeenCalled();
    expect(component.userForm.get('id')?.value).toBe(12345);
  });

  it('should call the addUser method if data is not provided', () => {
    const newUserData = { ...mockData, id: '' };
    component.data = null as any;
    component.userForm.setValue(newUserData);
    
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'addUser').and.callThrough();
  
    component.handleUserData();
    
    expect(userService.addUser).toHaveBeenCalledWith(newUserData);
  });

  it('should call the updateUser method if data is provided', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'updateUser').and.callThrough();
    
    component.handleUserData();
    
    expect(userService.updateUser).toHaveBeenCalledWith(mockData);
  });

  it('should reset the form and close the dialog when closeModal is called', () => {
    component.closeModal();
    
    expect(component.userForm.pristine).toBeTrue();
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should make the form invalid if required fields are empty', () => {
    component.userForm.get('name')?.setValue('');
    component.userForm.get('email')?.setValue('');
    component.userForm.get('phone')?.setValue('');
    component.userForm.get('birthDate')?.setValue('');
    component.userForm.get('role')?.setValue('');

    expect(component.userForm.invalid).toBeTrue();
  });

  it('should make the form valid when all fields are filled correctly', () => {
    component.userForm.get('name')?.setValue('John Doe');
    component.userForm.get('email')?.setValue('john.doe@example.com');
    component.userForm.get('phone')?.setValue('(51) 99275-3945');
    component.userForm.get('birthDate')?.setValue('1990-01-01');
    component.userForm.get('role')?.setValue('Administrador');

    expect(component.userForm.valid).toBeTrue();
  });

});