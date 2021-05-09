import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgemeneInformatieComponent } from './algemene-informatie.component';

describe('AlgemeneInformatieComponent', () => {
  let component: AlgemeneInformatieComponent;
  let fixture: ComponentFixture<AlgemeneInformatieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgemeneInformatieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgemeneInformatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
