import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPiezaComponent } from './consultar-pieza.component';

describe('ConsultarPiezaComponent', () => {
  let component: ConsultarPiezaComponent;
  let fixture: ComponentFixture<ConsultarPiezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarPiezaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarPiezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
