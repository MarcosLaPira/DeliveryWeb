import { Component, computed, effect, signal, ViewChild } from '@angular/core';
import { ModalOpcionesComponent } from '../../../features/share-components/modal-opciones/modal-opciones.component';
import { AdvancedFiltersComponent } from '../../../features/share-components/advanced-filters/advanced-filters.component';
import { TablaPiezasComponent } from '../../../features/share-components/tabla-piezas/tabla-piezas.component';
import { Filtro } from '../../../core/interfaces/Filtro';
import { Router } from '@angular/router';
import { PermisionariaComponent } from '../permisionaria/permisionaria.component';
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { FiltroconsultaPieza } from '../../../core/interfaces/modelos/FiltroConsultaPieza';
import { HistorialPiezaModalComponent } from '../../../features/share-components/HistorialPiezaModal/HistorialPiezaModal.component';
import { historia } from '../../../core/interfaces/modelos/Historia';

@Component({
  selector: 'app-consultar-pieza',
  imports: [
    ModalOpcionesComponent,
    AdvancedFiltersComponent,
    AdvancedFiltersComponent,
    TablaPiezasComponent,
    HistorialPiezaModalComponent,
  ],
  templateUrl: './consultar-pieza.component.html',
  styleUrl: './consultar-pieza.component.css',
})
export class ConsultarPiezaComponent {
  //constructor para inyectar servicios y dependencias
  //ngOnInit para inicializar datos o servicios
  //ngafterViewInit para trabajar con componentes hijos y señales

  piezas = signal<Pieza[]>([]); // Inicializa la señal de piezas como un array vacío
  historialPieza = signal<historia[] | null>(null);
  showFilters = signal(false);
  filtrosActivos = signal<FiltroconsultaPieza>(new FiltroconsultaPieza());
  // Signals para paginación
  currentPageSignal = signal(1);
  filasPorPaginaSignal = signal(10); // o lo que el usuario elija
  // Signal que controla si el modal está abierto o cerrado
  modalAbierto = signal(false);

  cargando = signal<boolean>(false); // Signal para controlar el estado de carga

  @ViewChild('filtrosComponent') filtrosComponent!: AdvancedFiltersComponent;
  @ViewChild('tablaPiezas') tablaPiezas!: TablaPiezasComponent;

  constructor(
    private router: Router,
    private piezasSeleccionadasService: PiezasSeleccionadasService,
    private deliveryApiService: DeliveryApiService
  ) {}

  ngOnInit() {
    const piezasGuardadas = this.piezasSeleccionadasService.getPiezasCargadas();
    if (piezasGuardadas.length > 0) {
      this.piezas.set(piezasGuardadas);
    } else {
      // cargar normalmente desde la API
    }
  }

  //se ejecuta después de que la vista del componente se ha inicializado

  ngAfterViewInit() {
    // Suscribirse a eventos de la tabla de piezas
    this.tablaPiezas.seleccionMasivaSig.subscribe((ids) => {
      this.onSeleccionMasiva(ids);
    });

    /*

     this.tablaPiezas.verHistoria.subscribe(id => {
      this.onVerHistoria(id);
    });
    */

    if (this.filtrosComponent) {
      this.filtrosComponent.filtroAplicado.subscribe((filtro) => {
        console.log('Filtro aplicado en el padre:', filtro);
        this.onFiltroAplicado(filtro);
      });
      this.filtrosComponent.filtroEliminado.subscribe((key) => {
        this.onFiltroEliminado(key);
      });
      this.filtrosComponent.limpiarTodos.subscribe(() => {
        this.onLimpiarTodos();
      });

      this.filtrosComponent.stringDelFiltro.subscribe((filtro) => {
        console.log('Filtro recibido en el padre:', filtro);
        this.onStringDelFiltro(filtro);
      });
    }
  }

  // Métodos para manejar los filtros que son las subscripciones a los eventos del componente de filtros
  onFiltroAplicado(filtro: FiltroconsultaPieza) {
    this.filtrosActivos.set(filtro);
  }
  onFiltroEliminado(key: string) {
    // Elimina la referencia directa al hijo y solo actualiza el estado local de filtros
    this.quitarFiltro(key as keyof FiltroconsultaPieza);
  }
  onLimpiarTodos() {
    // Limpia todos los filtros activos en el padre
    this.filtrosActivos.set(new FiltroconsultaPieza());
  }

  onStringDelFiltro(filtro: string) {
    // Señal para indicar si está cargando
    this.cargando.set(true);
    try {
      console.log('ya por llamar al servicio:', filtro);
      this.deliveryApiService.GetPieza(filtro).subscribe({
        next: (piezas) => {
          console.log('Piezas obtenidas:', piezas);
          this.piezas.set(piezas);
          this.cargando.set(false); // Actualiza el estado de carga
          this.piezasSeleccionadasService.setPiezasCargadas(piezas); // Guarda las piezas cargadas
        },
        error: (err) => {
          console.error('Error al obtener piezas:', err);
          this.cargando.set(false);
        },
      });
    } catch (error) {
      console.error('Excepción al llamar al servicio:', error);
      this.cargando.set(false);
    }
  }

  onSeleccionMasiva(ids: number[]) {
    const seleccionadas = this.piezas().filter((p) => ids.includes(p.IDPieza));

    this.piezasSeleccionadasService.setPiezasSeleccionadas(seleccionadas);
    this.router.navigate(['/permisionaria']);
  }

  toggleFiltro() {
    this.showFilters.update((value) => !value);
  }

  quitarFiltro(clave: keyof FiltroconsultaPieza) {
    const copia = structuredClone(this.filtrosActivos());

    const valor = copia[clave];

    if (Array.isArray(valor)) {
      (copia[clave] as any) = [];
    } else {
      (copia[clave] as any) = '';
    }

    this.filtrosActivos.set(copia);

    // Solo llama a resetearFiltro si la clave existe en Filtro
    if ((clave as keyof Filtro) in this.filtrosComponent.filtrosForm.controls) {
      this.filtrosComponent.resetearFiltro(clave as keyof Filtro);
    }

    this.onFiltroAplicado(this.filtrosActivos());
  }

  //cierra y abre componente de filtros

  abrirModal(pieza: Pieza) {
    // Usás la pieza seleccionada para mostrar el modal

    this.modalAbierto.set(true); // Abre el modal
  }

  cerrarModal() {
    this.modalAbierto.set(false); // Cierra el modal
  }

  toggleFilters() {
    this.showFilters.update((v) => !v);
  }

  // Métodos para actualizar los signals
  cambiarPagina(nueva: number) {
    if (nueva >= 1 && nueva <= this.totalPagesSignal()) {
      this.currentPageSignal.set(nueva);
    }
  }

  cambiarPageSize(nuevoTam: number) {
    this.filasPorPaginaSignal.set(nuevoTam);
    this.currentPageSignal.set(1); // resetea la página
  }

  // Llama a emitirSeleccionMasiva cuando se hace clic en el botón de Andreani
  emitirSeleccionMasivaDesdePadreAlMapa() {
    // Suponiendo que las piezas seleccionadas tienen isSelected === true
    const seleccionadas = this.piezas().filter((p) => p.isSelected);
    if (seleccionadas.length === 0) {
      alert('Selecciona al menos una pieza');
      return;
    }

    this.piezasSeleccionadasService.setPiezasMapas(seleccionadas);
    this.router.navigate(['./mapa']);
  }

  // Llama a emitirSeleccionMasiva cuando se hace clic en el botón de Andreani
  emitirSeleccionMasivaDesdePadre() {
    // Suponiendo que las piezas seleccionadas tienen isSelected === true
    const seleccionadas = this.piezas().filter((p) => p.isSelected);
    if (seleccionadas.length === 0) {
      alert('Selecciona al menos una pieza');
      return;
    }

    this.piezasSeleccionadasService.setPiezasSeleccionadas(seleccionadas);
    this.router.navigate(['/permisionaria']);
  }
  // Computed: etiquetas de filtros activos visibles
  // Filtra los filtros activos para mostrar solo aquellos que tienen valor
  getFiltrosActivosVisibles = computed(() => {
    return Object.entries(this.filtrosActivos()).filter(([_, valor]) => {
      if (Array.isArray(valor)) return valor.length > 0;
      return valor !== null && valor !== undefined && valor !== '';
    });
  });

  emitirCambioDeEstado() {
    // Lógica para emitir el cambio de estado
    const piezasSeleccionadas = this.piezas().filter((p) => p.isSelected);
    if (piezasSeleccionadas.length === 0) {
      alert('Selecciona al menos una pieza para cambiar el estado');
      return;
    }

    // Emitir el cambio de estado
    this.piezasSeleccionadasService.setPiezasSeleccionadas(piezasSeleccionadas);
    this.router.navigate(['/cambiar-estado']);
  }

  // Computed: piezas visibles
  piezasPaginadas = computed(() => {
    const todas = this.piezas();

    const pageSize = this.filasPorPaginaSignal();
    const page = this.currentPageSignal();
    const start = (page - 1) * pageSize;

    return todas.slice(start, start + pageSize);
  });

  // Computed: total de páginas
  totalPagesSignal = computed(() =>
    Math.ceil(this.piezas().length / this.filasPorPaginaSignal())
  );

  onVerHistoria(idPieza: number) {
    console.log('Ver historial de la pieza con ID: ' + idPieza);

    this.cargando.set(true);
    this.deliveryApiService.Gethistoria(idPieza).subscribe({
      next: (historias) => {
        this.historialPieza.set(historias);
        this.cargando.set(false);
      },
      error: (err) => {
        this.cargando.set(false);
        alert('Error al obtener historial');
      },
    });
  }

  cerrarHistorial() {
    this.historialPieza.set(null);
  }

  // Efecto para cambiar el cursor global
}
