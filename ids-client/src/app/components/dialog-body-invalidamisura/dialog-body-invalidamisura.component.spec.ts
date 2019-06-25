import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyInvalidamisuraComponent } from './dialog-body-invalidamisura.component';

describe('DialogBodyInvalidamisuraComponent', () => {
  let component: DialogBodyInvalidamisuraComponent;
  let fixture: ComponentFixture<DialogBodyInvalidamisuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyInvalidamisuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyInvalidamisuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
