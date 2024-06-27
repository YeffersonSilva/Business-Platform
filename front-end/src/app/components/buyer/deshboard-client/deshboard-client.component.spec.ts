import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshboardClientComponent } from './deshboard-client.component';

describe('DeshboardClientComponent', () => {
  let component: DeshboardClientComponent;
  let fixture: ComponentFixture<DeshboardClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeshboardClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeshboardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
