import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestClientComponent } from './interest-client.component';

describe('InterestClientComponent', () => {
  let component: InterestClientComponent;
  let fixture: ComponentFixture<InterestClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
