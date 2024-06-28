import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallClientComponent } from './call-client.component';

describe('CallClientComponent', () => {
  let component: CallClientComponent;
  let fixture: ComponentFixture<CallClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
