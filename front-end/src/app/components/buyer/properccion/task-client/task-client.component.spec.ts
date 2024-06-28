import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskClientComponent } from './task-client.component';

describe('TaskClientComponent', () => {
  let component: TaskClientComponent;
  let fixture: ComponentFixture<TaskClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
