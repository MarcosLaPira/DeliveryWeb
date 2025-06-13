import { Component, input, Input, OnChanges, output, Signal, signal } from '@angular/core';
import { Filtro } from '../../../core/interfaces/Filtro';
import{FormArray, FormBuilder, FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
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
  
  filtroAplicado = output<Filtro>();
  filtroEliminado = output<keyof Filtro>();
  limpiarTodos = output<void>();

  filtroAplicadoSignal = signal<Filtro | null>(null);
  filtroEliminadoSignal = signal<keyof Filtro | null>(null);
  limpiarTodosSignal = signal<boolean>(false);

  filtrosForm: FormGroup;
  estadosDisponibles = ['Pendiente', 'Aprobado', 'Rechazado','En cutodia', 'En correo', 'El el banco','Entregado', 'Recibido', 'Recontra entregado','Pendiente', 'Aprobado', 'Rechazado','En cutodia', 'En correo', 'El el banco','Entregado', 'Recibido', 'Recontra entregado']; // ej.

  expanded: { [key: string]: boolean } = {};

  // Inicializa el formulario con los controles necesarios
  constructor(private fb: FormBuilder) {
    this.filtrosForm = this.fb.group({
      dni: ['', [Validators.pattern('^[0-9]*$')]],
      administradora: [''],
      permisionaria: [''],
      tarjeta: [''],
      fechaDesde: [''],
      fechaHasta: [''],
      // Crea un FormArray para los estados, inicializado con los estados disponibles
      // Cada estado es un FormControl que puede ser true o false
      estados: this.fb.array(this.estadosDisponibles.map(() => false)),
    });

  }

  // Detecta cambios en los inputs y actualiza el formulario
  // ngOnChanges se llama cuando los inputs cambian, ideal para sincronizar el formulario con los filtros
  ngOnChanges() {

    if (this.filtrosForm && this.filtros) {
      
      // Actualiza los valores del formulario con los filtros proporcionados
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

  // Método para aplicar los filtros y emitir el evento con los datos del formulario
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

  // Método para resetear todos los filtros
  resetFilters() {
    this.filtrosForm.reset();
    this.limpiarTodos.emit();
  }

  resetearFiltro(clave: keyof Filtro) {
    if (clave === 'estados') {
      const estadosArray = this.filtrosForm.get('estados') as FormArray;
      estadosArray.controls.forEach(control => control.setValue(false));
    } else {
      this.filtrosForm.get(clave)?.setValue('');
    }
    this.filtroEliminado.emit(clave);
  }




}
