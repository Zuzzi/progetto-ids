import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyInsregistroComponent } from './dialog-body-insregistro.component';

describe('DialogBodyInsregistroComponent', () => {
  let component: DialogBodyInsregistroComponent;
  let fixture: ComponentFixture<DialogBodyInsregistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyInsregistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyInsregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
