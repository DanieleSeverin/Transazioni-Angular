import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBalanceComponent } from './accounts-balance.component';

describe('AccountsBalanceComponent', () => {
  let component: AccountsBalanceComponent;
  let fixture: ComponentFixture<AccountsBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
