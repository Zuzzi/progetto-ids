import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyVisriservaComponent } from './dialog-body-visriserva.component';

describe('DialogBodyVisriservaComponent', () => {
  let component: DialogBodyVisriservaComponent;
  let fixture: ComponentFixture<DialogBodyVisriservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyVisriservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyVisriservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
