import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyAddriservaComponent } from './dialog-body-addriserva.component';

describe('DialogBodyAddriservaComponent', () => {
  let component: DialogBodyAddriservaComponent;
  let fixture: ComponentFixture<DialogBodyAddriservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyAddriservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyAddriservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
