import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ps4Page } from './ps4.page';

describe('Ps4Page', () => {
  let component: Ps4Page;
  let fixture: ComponentFixture<Ps4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ps4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ps4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
