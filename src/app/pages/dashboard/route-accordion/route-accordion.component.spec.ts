import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAccordionComponent } from './route-accordion.component';

describe('RouteAccordionComponent', () => {
  let component: RouteAccordionComponent;
  let fixture: ComponentFixture<RouteAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
