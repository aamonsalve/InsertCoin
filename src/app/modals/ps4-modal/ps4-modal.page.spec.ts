import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ps4ModalPage } from './ps4-modal.page';

describe('Ps4ModalPage', () => {
  let component: Ps4ModalPage;
  let fixture: ComponentFixture<Ps4ModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ps4ModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ps4ModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
