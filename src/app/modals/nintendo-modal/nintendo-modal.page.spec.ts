import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NintendoModalPage } from './nintendo-modal.page';

describe('NintendoModalPage', () => {
  let component: NintendoModalPage;
  let fixture: ComponentFixture<NintendoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NintendoModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NintendoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
