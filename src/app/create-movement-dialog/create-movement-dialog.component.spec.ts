import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMovementDialogComponent } from './create-movement-dialog.component';

describe('CreateMovementDialogComponent', () => {
  let component: CreateMovementDialogComponent;
  let fixture: ComponentFixture<CreateMovementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMovementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMovementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
