import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoBloqueComponent } from './nuevo-bloque.component';

describe('NuevoBloqueComponent', () => {
  let component: NuevoBloqueComponent;
  let fixture: ComponentFixture<NuevoBloqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoBloqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoBloqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
