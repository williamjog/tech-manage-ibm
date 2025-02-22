import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let matDialogMock: any;

  beforeEach(async () => {
    matDialogMock = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: MatDialog, useValue: matDialogMock }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'teste-ibm'`, () => {
    expect(component.title).toEqual('teste-ibm');
  });

  it('should open the user modal when openUserModal() is called', () => {
    component.openUserModal();
    expect(matDialogMock.open).toHaveBeenCalled();
    const dialogConfig = matDialogMock.open.calls.mostRecent().args[1];
    expect(dialogConfig.width).toBe('300px');
    expect(dialogConfig.maxHeight).toBe('85%');
    expect(dialogConfig.autoFocus).toBeFalse();
  });

  it('should render the logo image', () => {
    const logo = fixture.debugElement.query(By.css('.logo'));
    expect(logo).toBeTruthy();
    expect(logo.nativeElement.src).toContain('assets/logo.png');
  });

  it('should render the "CADASTRAR USUÁRIO" button', () => {
    const button = fixture.debugElement.query(By.css('.addUser button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent.trim()).toBe('CADASTRAR USUÁRIO');
  });

  it('should render the <app-user-list> component', () => {
    const userList = fixture.debugElement.query(By.css('app-user-list'));
    expect(userList).toBeTruthy();
  });

  it('should render the footer with the current year', () => {
    const footer = fixture.debugElement.query(By.css('.footer'));
    expect(footer.nativeElement.textContent).toContain(new Date().getFullYear());
  });

});