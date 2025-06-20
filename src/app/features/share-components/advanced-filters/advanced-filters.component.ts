import { Component, input, Input, OnChanges, OnInit, output, Signal, signal } from '@angular/core';
import { Filtro } from '../../../core/interfaces/Filtro';
import{FormArray, FormBuilder, FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';
import { FiltroconsultaPieza } from '../../../core/interfaces/modelos/FiltroConsultaPieza';
import { Producto } from '../../../core/interfaces/modelos/Productos';

@Component({
  selector: 'app-advanced-filters',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './advanced-filters.component.html',
  styleUrl: './advanced-filters.component.css'
})
export class AdvancedFiltersComponent implements OnInit,OnChanges {


  @Input() mostrar: boolean = false;
  @Input() filtros: FiltroconsultaPieza = new FiltroconsultaPieza();
  
  filtroAplicado = output<FiltroconsultaPieza>();
  stringDelFiltro = output<string>();
  filtroEliminado = output<keyof Filtro>();
  limpiarTodos = output<void>();

  filtroAplicadoSignal = signal<Filtro | null>(null);
  filtroEliminadoSignal = signal<keyof Filtro | null>(null);
  limpiarTodosSignal = signal<boolean>(false);

  filtrosForm: FormGroup;
   filtro: FiltroconsultaPieza = new FiltroconsultaPieza();
  estadosDisponibles = ['Pendiente', 'Aprobado', 'Rechazado','En cutodia', 'En correo', 'El el banco','Entregado', 'Recibido', 'Recontra entregado','Pendiente', 'Aprobado', 'Rechazado','En cutodia', 'En correo', 'El el banco','Entregado', 'Recibido', 'Recontra entregado']; // ej.

  expanded: { [key: string]: boolean } = {};

  
  productosSignal = signal<Producto[]>([]);


  // Inicializa el formulario con los controles necesarios
 constructor(
    private fb: FormBuilder,
    private deliveryApiService: DeliveryApiService
  ) {
    this.filtrosForm = this.fb.group({
      idpieza: [''],
      locacion: [''],
      idTipoProducto: [''],
      idSucursal: [''],
      nombreTitular: [''],
      identificadorPieza: [''],
      nroSecuenciaPermisionaria: [''],
      nroSecuenciaAdministradora: [''],
      numeroCuenta: [''],
      numeroDocumento: [''],
      cuitcuil: [''],
      fechaDesde: [''], // Fecha por defecto para probar
      fechaHasta: [''],     
      estados: [''],
      idMotivoNoEntrega: [''],
      codigoNovedad: [''],
      idTipoDocumento: [''],
      numeroCliente: [''],
      estadoDesde: [''],
      tipoCarta: ['']
    });
  }

  ngOnInit() {
    this.deliveryApiService.getCatalogoProductos().subscribe(resp => {
      // Si la respuesta es un objeto tipo { "1": {...}, "2": {...} }
      this.productosSignal.set(resp);
    });
  }

  // Detecta cambios en los inputs y actualiza el formulario
  // ngOnChanges se llama cuando los inputs cambian, ideal para sincronizar el formulario con los filtros
  ngOnChanges() {
    if (this.filtrosForm && this.filtros) {
      this.filtrosForm.patchValue({
        idpieza: this.filtros.idpieza || '',
        locacion: this.filtros.locacion || '',
        idTipoProducto: this.filtros.idTipoProducto || '',
        idSucursal: this.filtros.idSucursal || '',
        nombreTitular: this.filtros.nombreTitular || '',
        identificadorPieza: this.filtros.identificadorPieza || '',
        nroSecuenciaPermisionaria: this.filtros.nroSecuenciaPermisionaria || '',
        nroSecuenciaAdministradora: this.filtros.nroSecuenciaAdministradora || '',
        numeroCuenta: this.filtros.numeroCuenta || '',
        numeroDocumento: this.filtros.numeroDocumento || '',
        cuitcuil: this.filtros.cuitcuil || '',
        fechaDesde: this.filtros.fechaDesde || '',
        fechaHasta: this.filtros.fechaHasta || '',
        estados: this.filtros.estados || '',
        idMotivoNoEntrega: this.filtros.idMotivoNoEntrega || '',
        codigoNovedad: this.filtros.codigoNovedad || '',
        idTipoDocumento: this.filtros.idTipoDocumento || '',
        numeroCliente: this.filtros.numeroCliente || '',
        estadoDesde: this.filtros.estadoDesde || '',
        tipoCarta: this.filtros.tipoCarta || ''
      }, { emitEvent: false });
    }
  }

  toggleExpand(key: string) {
    this.expanded[key] = !this.expanded[key];
  }

  // Método para aplicar los filtros y emitir el evento con los datos del formulario
  aplicarFiltro() {
    console.log('Aplicando filtro con los siguientes valores:');
     console.log(this.filtrosForm.value); // <-- Verifica aquí
    // Mapea los valores del formulario al objeto filtro
    Object.assign(this.filtro, this.filtrosForm.value);
    console.log('Filtro aplicado:', this.filtro);

    // Construye el string de filtro
    const filtroQuery = this.filtro.GetFiltroToText();

    console.log('Filtro query:', filtroQuery);
    // Emite el string de filtro al padre
    this.filtroAplicado.emit(this.filtro);
    this.stringDelFiltro.emit(filtroQuery);
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
