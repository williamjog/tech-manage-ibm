import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
    expect(dialogConfig.width).toBe('80%');
    expect(dialogConfig.height).toBe('85%');
    expect(dialogConfig.autoFocus).toBeFalse();
  });

});