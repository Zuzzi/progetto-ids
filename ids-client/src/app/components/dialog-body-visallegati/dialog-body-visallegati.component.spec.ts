import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyVisallegatiComponent } from './dialog-body-visallegati.component';

describe('DialogBodyVisallegatiComponent', () => {
  let component: DialogBodyVisallegatiComponent;
  let fixture: ComponentFixture<DialogBodyVisallegatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyVisallegatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyVisallegatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
