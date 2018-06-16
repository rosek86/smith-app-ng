import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmithComponent } from './smith.component';

describe('SmithComponent', () => {
  let component: SmithComponent;
  let fixture: ComponentFixture<SmithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
