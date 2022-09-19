import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoejercicioComponent } from './nuevoejercicio.component';

describe('NuevoejercicioComponent', () => {
  let component: NuevoejercicioComponent;
  let fixture: ComponentFixture<NuevoejercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoejercicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoejercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
