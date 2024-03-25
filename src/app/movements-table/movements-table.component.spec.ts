import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsTableComponent } from './movements-table.component';

describe('MovementsTableComponent', () => {
  let component: MovementsTableComponent;
  let fixture: ComponentFixture<MovementsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
