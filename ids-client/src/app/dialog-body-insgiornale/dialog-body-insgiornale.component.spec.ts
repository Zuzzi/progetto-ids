import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyInsgiornaleComponent } from './dialog-body-insgiornale.component';

describe('DialogBodyInsgiornaleComponent', () => {
  let component: DialogBodyInsgiornaleComponent;
  let fixture: ComponentFixture<DialogBodyInsgiornaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyInsgiornaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyInsgiornaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
