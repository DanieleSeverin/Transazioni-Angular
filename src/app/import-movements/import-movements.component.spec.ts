import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMovementsComponent } from './import-movements.component';

describe('ImportMovementsComponent', () => {
  let component: ImportMovementsComponent;
  let fixture: ComponentFixture<ImportMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportMovementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
