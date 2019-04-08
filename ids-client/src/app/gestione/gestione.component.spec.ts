import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneComponent } from './gestione.component';

describe('GestioneComponent', () => {
  let component: GestioneComponent;
  let fixture: ComponentFixture<GestioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
