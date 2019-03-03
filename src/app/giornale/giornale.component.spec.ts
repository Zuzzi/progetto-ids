import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiornaleComponent } from './giornale.component';

describe('GiornaleComponent', () => {
  let component: GiornaleComponent;
  let fixture: ComponentFixture<GiornaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiornaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiornaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
