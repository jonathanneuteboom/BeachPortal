import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuweRondeDialogComponent } from './nieuwe-ronde-dialog.component';

describe('NieuweRondeDialogComponent', () => {
  let component: NieuweRondeDialogComponent;
  let fixture: ComponentFixture<NieuweRondeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NieuweRondeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NieuweRondeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
