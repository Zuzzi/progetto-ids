import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyApprovazioneComponent } from './dialog-body-approvazione.component';

describe('DialogBodyApprovazioneComponent', () => {
  let component: DialogBodyApprovazioneComponent;
  let fixture: ComponentFixture<DialogBodyApprovazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBodyApprovazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyApprovazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
