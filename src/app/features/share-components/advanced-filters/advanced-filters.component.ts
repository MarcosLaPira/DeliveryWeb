import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';
import { Filtro } from '../../../core/interfaces/Filtro';
import{FormArray, FormBuilder, FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-advanced-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './advanced-filters.component.html',
  styleUrl: './advanced-filters.component.css'
})
export class AdvancedFiltersComponent {

  @Input() mostrar: boolean = false;

  @Output() filtroAplicado = new EventEmitter<Filtro>();

  filtrosForm: FormGroup;
  estadosDisponibles = ['Pendiente', 'Aprobado', 'Rechazado','En cutodia', 'En correo', 'El el banco','Entregado', 'Recibido', 'Recontra entregado','Pendiente', 'Aprobado', 'Rechazado','En cutodia', 'En correo', 'El el banco','Entregado', 'Recibido', 'Recontra entregado']; // ej.

  constructor(private fb: FormBuilder) {

    this.filtrosForm = this.fb.group({
      dni: [''],
      administradora: [''],
      permisionaria: [''],
      tarjeta: [''],
      fechaDesde: [''],
      fechaHasta: [''],
      estados: this.fb.array(this.estadosDisponibles.map(() => false)),
    });
  }

  aplicarFiltros() {
    if (this.filtrosForm.valid) {
      const formValue = this.filtrosForm.value;
      const filtros: Filtro = {
        dni: formValue.dni,
        tarjeta: formValue.tarjeta,
        administradora: formValue.administradora,
        permisionaria: formValue.permisionaria,
        fechaDesde: formValue.fechaDesde,
        fechaHasta: formValue.fechaHasta,
        estados: this.estadosDisponibles.filter((_, i) => formValue.estados[i])
      };
      this.filtroAplicado.emit(filtros);
    }
  }

    resetearFiltro(clave: keyof Filtro) {
    if (clave === 'estados') {
      const estadosArray = this.filtrosForm.get('estados') as FormArray;
      estadosArray.controls.forEach(control => control.setValue(false));
    } else {
      this.filtrosForm.get(clave)?.setValue('');
    }
  }




}
