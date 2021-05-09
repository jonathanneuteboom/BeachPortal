import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBeachComponent } from './my-beach.component';

describe('MyBeachComponent', () => {
  let component: MyBeachComponent;
  let fixture: ComponentFixture<MyBeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBeachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
