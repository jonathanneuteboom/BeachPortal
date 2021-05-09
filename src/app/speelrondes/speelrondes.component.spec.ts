import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeelrondesComponent } from './speelrondes.component';

describe('SpeelrondesComponent', () => {
  let component: SpeelrondesComponent;
  let fixture: ComponentFixture<SpeelrondesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeelrondesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeelrondesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
