import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UitslagInvoerenDialogComponent } from './uitslag-invoeren-dialog.component';

describe('UitslagInvoerenDialogComponent', () => {
  let component: UitslagInvoerenDialogComponent;
  let fixture: ComponentFixture<UitslagInvoerenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UitslagInvoerenDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UitslagInvoerenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
