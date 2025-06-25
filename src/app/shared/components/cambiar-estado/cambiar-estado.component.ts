import { Component, signal, computed, Signal, ViewChild } from '@angular/core';
import { Filtro } from '../../../core/interfaces/Filtro';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { AdvancedFiltersComponent } from "../../../features/share-components/advanced-filters/advanced-filters.component";
import { TablaPiezasComponent } from "../../../features/share-components/tabla-piezas/tabla-piezas.component";
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';
import { FiltroconsultaPieza } from '../../../core/interfaces/modelos/FiltroConsultaPieza';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';
import { Estado } from '../../../core/interfaces/modelos/Estado';

@Component({
  selector: 'app-cambiar-estado',
  templateUrl: './cambiar-estado.component.html',
  styleUrl: './cambiar-estado.component.css',
  imports: [AdvancedFiltersComponent, TablaPiezasComponent]
})
export class CambiarEstadoComponent {

  // Datos de ejemplo (puedes reemplazar por fetch real)
  
  piezas = signal<Pieza[]>([]); // Inicializa la señal de piezas como un array vacío
  showFilters = signal(false);
  filtrosActivos = signal<FiltroconsultaPieza>(new FiltroconsultaPieza());

  filasPorPaginaSignal = signal(10);
  currentPageSignal = signal(1);

  piezasSeleccionadasSignal = signal<Pieza[]>([]); // Inicializa la señal de piezas como un array vacío
  cargando = signal<boolean>(false); // Signal para controlar el estado de carga
  
  estadosSignal = signal<Estado[]>([]);
  

  

  // Modal de cambio de estado
  piezaSeleccionada = signal<Pieza | null>(null);
  @ViewChild('filtrosComponent') filtrosComponent!: AdvancedFiltersComponent;

  nuevoEstado: number | undefined;



  
  constructor
  (
    private piezasSeleccionadasService: PiezasSeleccionadasService,
    private deliveryApiService: DeliveryApiService
  ){
    //deberia de solo setearse cuando el servicio de pieza seleccionada tiene algo
    this.piezasSeleccionadasSignal.set(this.piezasSeleccionadasService.getPiezasSeleccionadas()());
     
  }

  ngOnInit() {
  
    this.deliveryApiService.getCatalogoEstados().subscribe(resp => {
      this.estadosSignal.set(resp);
       console.log("estados cargados:", this.estadosSignal());
    });
 
  }

  

  

  toggleFiltro() {
    this.showFilters.update(v => !v);
  }



  onFiltroAplicado(filtro: FiltroconsultaPieza) {
    this.filtrosActivos.set(filtro);
    console.log("los filtros activos son:",filtro )

   
  }

  
  onStringDelFiltro(filtro: string) {
   
    this.cargando.set(true);

    try {

      console.log('ya por llamar al servicio:', filtro);
      this.deliveryApiService.GetPieza(filtro).subscribe({
        next: (piezas) => {
          this.piezas.set(piezas);
          console.log("piezas",this.piezas())
          this.piezasSeleccionadasSignal.set(piezas);
            console.log("piezas",this.piezasSeleccionadasSignal())
          this.cargando.set(false);
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

  onFiltroEliminado(key: string) {
    // Elimina la referencia directa al hijo y solo actualiza el estado local de filtros
    this.quitarFiltro(key as keyof FiltroconsultaPieza);
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
    if (clave as keyof Filtro in this.filtrosComponent.filtrosForm.controls) {
      this.filtrosComponent.resetearFiltro(clave as keyof Filtro);
    }

    this.onFiltroAplicado(this.filtrosActivos());
  }

  onLimpiarTodos() {
    this.filtrosActivos.set(new FiltroconsultaPieza());
  }

  cambiarPagina(nueva: number) {
    if (nueva >= 1 && nueva <= this.totalPagesSignal()) {
      this.currentPageSignal.set(nueva);
    }
  }

  cambiarPageSize(nuevoTam: number) {
    this.filasPorPaginaSignal.set(nuevoTam);
    this.currentPageSignal.set(1);
  }

  abrirCambioEstado(pieza: Pieza) {
    this.piezaSeleccionada.set(pieza);
    this.nuevoEstado = Number(pieza.Estado);
  }

  confirmarCambioEstado() {
    const pieza = this.piezaSeleccionada();
    if (pieza) {
      // Actualiza el estado en el array de piezas
      const piezas = this.piezasSeleccionadasSignal().map(p =>
        p.IDPieza === pieza.IDPieza ? { ...p, estado: this.nuevoEstado } : p
      );
      //this.piezasSeleccionadasSignal.set(piezas);
      this.piezaSeleccionada.set(null);
    }
  }

  cancelarCambioEstado() {
    this.piezaSeleccionada.set(null);
  }


   piezasPaginadas = computed(() => {
    const todas = this.piezasSeleccionadasSignal();
    const pageSize = this.filasPorPaginaSignal();
    const page = this.currentPageSignal();
    const start = (page - 1) * pageSize;
    return todas.slice(start, start + pageSize);
  });

  totalPagesSignal = computed(() =>
    Math.ceil(this.piezasSeleccionadasSignal().length / this.filasPorPaginaSignal())
  );

  // Etiquetas de filtros activos
  getFiltrosActivosVisibles = computed(() => {
    return Object.entries(this.filtrosActivos()).filter(([_, valor]) => {
      if (Array.isArray(valor)) return valor.length > 0;
      return valor !== null && valor !== undefined && valor !== '';
    });
  });

  erroresCambioEstadoSignal = signal<{ idPieza: number, detalle: string }[]>([]);

  aplicarCambioDeEstado() {
    alert("previo a aplicar cambio de etsado");

    const estadoSeleccionado = this.estadosSignal().find(e => e.idEst === this.nuevoEstado);

    const piezasSeleccionadas = this.piezasSeleccionadasSignal();
    const idNuevoEstado = Number(this.nuevoEstado);
    const usuario = 'A05212';
    const idRol = 2;

    if (!piezasSeleccionadas || piezasSeleccionadas.length === 0) {
      alert('No hay piezas seleccionadas para cambiar de estado');
      return;
    }

    // Limpia errores previos
    this.erroresCambioEstadoSignal.set([]);

    piezasSeleccionadas.forEach(pieza => {
      this.deliveryApiService.PostAplicarCambioDeEstado(
        pieza.IDPieza,
        Number(pieza.IDTipoProducto),
        idNuevoEstado,
        usuario,
        idRol
      ).subscribe({
        next: (resp: any) => {
          // Si el backend devuelve un error en el JSON, lo guardamos
          if (resp && resp.Error) {
            const erroresActuales = this.erroresCambioEstadoSignal();
            this.erroresCambioEstadoSignal.set([
              ...erroresActuales,
              { idPieza: pieza.IDPieza, detalle: resp.DetalleError || 'Error desconocido' }
            ]);
          } else {
            console.log(`Cambio de estado aplicado a pieza ${pieza.IDPieza}`, resp);
          }
        },
        error: (err) => {
          // También puedes guardar errores de red aquí si lo deseas
          const erroresActuales = this.erroresCambioEstadoSignal();
          this.erroresCambioEstadoSignal.set([
            ...erroresActuales,
            { idPieza: pieza.IDPieza, detalle: 'Error de red o servidor' }
          ]);
          console.error(`Error al cambiar estado de pieza ${pieza.IDPieza}`, err);
        }
      });
    });
  }

}
