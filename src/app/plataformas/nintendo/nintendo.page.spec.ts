import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NintendoPage } from './nintendo.page';

describe('NintendoPage', () => {
  let component: NintendoPage;
  let fixture: ComponentFixture<NintendoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NintendoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NintendoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
