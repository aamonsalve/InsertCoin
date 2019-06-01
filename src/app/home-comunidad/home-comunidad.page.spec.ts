import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComunidadPage } from './home-comunidad.page';

describe('HomeComunidadPage', () => {
  let component: HomeComunidadPage;
  let fixture: ComponentFixture<HomeComunidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComunidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComunidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
