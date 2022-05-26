import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwcartComponent } from './veiwcart.component';

describe('VeiwcartComponent', () => {
  let component: VeiwcartComponent;
  let fixture: ComponentFixture<VeiwcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
