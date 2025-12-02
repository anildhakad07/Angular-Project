import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Specialthanks } from './special-thanks';

describe('SpecialThanks', () => {
  let component: Specialthanks;
  let fixture: ComponentFixture<Specialthanks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Specialthanks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Specialthanks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
