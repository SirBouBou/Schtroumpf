import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmurfVillageComponent } from './smurf-village.component';

describe('SmurfVillageComponent', () => {
  let component: SmurfVillageComponent;
  let fixture: ComponentFixture<SmurfVillageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmurfVillageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmurfVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
