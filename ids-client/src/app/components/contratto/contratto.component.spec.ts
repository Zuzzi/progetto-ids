import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrattoComponent } from './contratto.component';

describe('ContrattoComponent', () => {
  let component: ContrattoComponent;
  let fixture: ComponentFixture<ContrattoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrattoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
