import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstCirclesComponent } from './const-circles.component';

describe('ConstCirclesComponent', () => {
  let component: ConstCirclesComponent;
  let fixture: ComponentFixture<ConstCirclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstCirclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
