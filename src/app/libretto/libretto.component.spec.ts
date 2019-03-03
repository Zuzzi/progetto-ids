import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrettoComponent } from './libretto.component';

describe('LibrettoComponent', () => {
  let component: LibrettoComponent;
  let fixture: ComponentFixture<LibrettoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrettoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
