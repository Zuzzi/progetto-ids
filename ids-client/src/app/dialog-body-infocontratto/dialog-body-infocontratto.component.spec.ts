import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyInfocontrattoComponent } from './dialog-body-infocontratto.component';

describe('DialogBodyInfocontrattoComponent', () => {
  let component: DialogBodyInfocontrattoComponent;
  let fixture: ComponentFixture<DialogBodyInfocontrattoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyInfocontrattoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyInfocontrattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
