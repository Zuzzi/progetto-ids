import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyInslibrettoComponent } from './dialog-body-inslibretto.component';

describe('DialogBodyInslibrettoComponent', () => {
  let component: DialogBodyInslibrettoComponent;
  let fixture: ComponentFixture<DialogBodyInslibrettoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyInslibrettoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyInslibrettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
