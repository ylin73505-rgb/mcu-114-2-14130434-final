import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardComponent } from './hard.component';

describe('HardComponent', () => {
  let component: HardComponent;
  let fixture: ComponentFixture<HardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
