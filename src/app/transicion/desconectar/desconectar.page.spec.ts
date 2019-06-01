import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesconectarPage } from './desconectar.page';

describe('DesconectarPage', () => {
  let component: DesconectarPage;
  let fixture: ComponentFixture<DesconectarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesconectarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesconectarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
