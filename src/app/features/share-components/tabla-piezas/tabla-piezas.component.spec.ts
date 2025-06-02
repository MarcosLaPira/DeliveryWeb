import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPiezasComponent } from './tabla-piezas.component';

describe('TablaPiezasComponent', () => {
  let component: TablaPiezasComponent;
  let fixture: ComponentFixture<TablaPiezasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaPiezasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaPiezasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
