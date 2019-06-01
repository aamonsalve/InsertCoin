import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XboxPage } from './xbox.page';

describe('XboxPage', () => {
  let component: XboxPage;
  let fixture: ComponentFixture<XboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XboxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
