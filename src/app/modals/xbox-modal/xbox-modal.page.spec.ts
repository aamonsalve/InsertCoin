import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XboxModalPage } from './xbox-modal.page';

describe('XboxModalPage', () => {
  let component: XboxModalPage;
  let fixture: ComponentFixture<XboxModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XboxModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XboxModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
