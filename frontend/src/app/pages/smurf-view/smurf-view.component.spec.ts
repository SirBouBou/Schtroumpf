import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmurfViewComponent } from './smurf-view.component';

describe('SmurfViewComponent', () => {
  let component: SmurfViewComponent;
  let fixture: ComponentFixture<SmurfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmurfViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmurfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
