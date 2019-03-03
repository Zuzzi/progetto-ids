import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlloComponent } from './controllo.component';

describe('ControlloComponent', () => {
  let component: ControlloComponent;
  let fixture: ComponentFixture<ControlloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
