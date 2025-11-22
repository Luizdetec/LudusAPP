import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LudusCheckbox } from './ludus-checkbox';

describe('LudusCheckbox', () => {
  let component: LudusCheckbox;
  let fixture: ComponentFixture<LudusCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LudusCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LudusCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
