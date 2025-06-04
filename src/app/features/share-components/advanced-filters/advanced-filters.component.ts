import { Component, EventEmitter, input, Input, OnChanges, Output, signal } from '@angular/core';
import { Filtro } from '../../../core/interfaces/Filtro';
import{FormArray, FormBuilder, FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced-filters',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './advanced-filters.component.html',
  styleUrl: './advanced-filters.component.css'
})
export class AdvancedFiltersComponent implements OnChanges {


  @Input() mostrar: boolean = false;
  @Input() filtros: Filtro = {};

  @Output() filtroAplicado = new EventEmitter<Filtro>();
  @Output() filtroEliminado = new EventEmitter<keyof Filtro>();
  @Output() limpiarTodos = new EventEmitter<void>();

  filtrosForm: FormGroup;
  estadosDisponibles = ['Pendiente', 'Aprobado', 'Rechazado','En cutodia', 'En correo', 'El el banco','Entregado', 'Recibido', 'Recontra entregado','Pendiente', 'Aprobado', 'Rechazado','En cutodia', 'En correo', 'El el banco','Entregado', 'Recibido', 'Recontra entregado']; // ej.

  expanded: { [key: string]: boolean } = {};

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

  ngOnChanges() {
    if (this.filtrosForm && this.filtros) {
      // Actualiza el formulario con los filtros activos
      this.filtrosForm.patchValue({
        dni: this.filtros.dni || '',
        administradora: this.filtros.administradora || '',
        permisionaria: this.filtros.permisionaria || '',
        tarjeta: this.filtros.tarjeta || '',
        fechaDesde: this.filtros.fechaDesde || '',
        fechaHasta: this.filtros.fechaHasta || '',
        estados: this.estadosDisponibles.map(e => this.filtros.estados?.includes(e) || false)
      }, { emitEvent: false });
    }
  }

  toggleExpand(key: string) {
    this.expanded[key] = !this.expanded[key];
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

  resetFilters() {
    this.filtrosForm.reset();
    // Notifica al padre que todos los filtros fueron eliminados
    this.limpiarTodos.emit();
  }

    resetearFiltro(clave: keyof Filtro) {
    if (clave === 'estados') {
      const estadosArray = this.filtrosForm.get('estados') as FormArray;
      estadosArray.controls.forEach(control => control.setValue(false));
    } else {
      this.filtrosForm.get(clave)?.setValue('');
    }
    // Emitir evento para notificar al padre que el filtro fue eliminado
    this.filtroEliminado.emit(clave);
  }




}
