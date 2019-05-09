import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyLoginComponent } from './dialog-body-login.component';

describe('DialogBodyLoginComponent', () => {
  let component: DialogBodyLoginComponent;
  let fixture: ComponentFixture<DialogBodyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
