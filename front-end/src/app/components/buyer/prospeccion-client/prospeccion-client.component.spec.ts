import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspeccionClientComponent } from './prospeccion-client.component';

describe('ProspeccionClientComponent', () => {
  let component: ProspeccionClientComponent;
  let fixture: ComponentFixture<ProspeccionClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspeccionClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspeccionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
