import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerDetailsComponent } from './marker-details.component';

describe('MarkerDetailsComponent', () => {
  let component: MarkerDetailsComponent;
  let fixture: ComponentFixture<MarkerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
