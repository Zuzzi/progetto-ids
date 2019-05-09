import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoComponent } from './accesso.component';

describe('AccessoComponent', () => {
  let component: AccessoComponent;
  let fixture: ComponentFixture<AccessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
