import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyApprovazionemisureComponent } from './dialog-body-approvazionemisure.component';

describe('DialogBodyApprovazionemisureComponent', () => {
  let component: DialogBodyApprovazionemisureComponent;
  let fixture: ComponentFixture<DialogBodyApprovazionemisureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyApprovazionemisureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyApprovazionemisureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
