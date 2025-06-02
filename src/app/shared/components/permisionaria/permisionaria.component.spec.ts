import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisionariaComponent } from './permisionaria.component';

describe('PermisionariaComponent', () => {
  let component: PermisionariaComponent;
  let fixture: ComponentFixture<PermisionariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisionariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisionariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
