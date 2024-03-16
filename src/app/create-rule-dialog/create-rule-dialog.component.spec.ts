import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRuleDialogComponent } from './create-rule-dialog.component';

describe('CreateRuleDialogComponent', () => {
  let component: CreateRuleDialogComponent;
  let fixture: ComponentFixture<CreateRuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRuleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
