import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBoxComponent } from './import-box.component';

describe('ImportBoxComponent', () => {
  let component: ImportBoxComponent;
  let fixture: ComponentFixture<ImportBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
