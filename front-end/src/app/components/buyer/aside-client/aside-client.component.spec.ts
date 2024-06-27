import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideClientComponent } from './aside-client.component';

describe('AsideClientComponent', () => {
  let component: AsideClientComponent;
  let fixture: ComponentFixture<AsideClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
