import { Component, signal, computed, Signal, ViewChild } from '@angular/core';
import { Filtro } from '../../../core/interfaces/Filtro';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { AdvancedFiltersComponent } from "../../../features/share-components/advanced-filters/advanced-filters.component";
import { TablaPiezasComponent } from "../../../features/share-components/tabla-piezas/tabla-piezas.component";
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';
import { FiltroconsultaPieza } from '../../../core/interfaces/modelos/FiltroConsultaPieza';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';
import { Estado } from '../../../core/interfaces/modelos/Estado';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-cambiar-estado',
  templateUrl: './cambiar-estado.component.html',
  styleUrl: './cambiar-estado.component.css',
  imports: [AdvancedFiltersComponent, TablaPiezasComponent]
})
export class CambiarEstadoComponent {



  // Datos de ejemplo (puedes reemplazar por fetch real)
  
 
  showFilters = signal(false);
  filtrosActivos = signal<FiltroconsultaPieza>(new FiltroconsultaPieza());

  filasPorPaginaSignal = signal(10);
  currentPageSignal = signal(1);

  piezasSeleccionadasSignal = signal<Pieza[]>([]); // Inicializa la señal de piezas como un array vacío
  cargando = signal<boolean>(false); // Signal para controlar el estado de carga
  
  estadosSignal = signal<Estado[]>([]);
  
  estadoSeleccionadoSignal = signal<number | null>(null); // Estado seleccionado
  erroresCambioEstadoSignal = signal<{ idPieza: number, detalle: string }[]>([]);
  mostrarResumenOpen= signal<boolean>(false); // Signal para controlar el estado de carga
  //ocultarResumen = false; // Controla si el resumen debe difuminarse
  exitosas =  signal(0);
  fallidas = signal(0);
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
   
    document.body.style.cursor = 'progress';
    this.cargando.set(true);

    try {

      console.log('ya por llamar al servicio:', filtro);
      this.deliveryApiService.GetPieza(filtro).subscribe({
        next: (piezas) => {
          //this.piezas.set(piezas);
          //console.log("piezas",this.piezas())
          this.piezasSeleccionadasSignal.set(piezas);
            console.log("piezas",this.piezasSeleccionadasSignal())
          this.cargando.set(false);
          
        },
        error: (err) => {

          console.error('Error al obtener piezas:', err);
          this.cargando.set(false);
         

        },
        complete: () => {
          console.log('Llamada al servicio completada');
          this.cargando.set(false);
          document.body.style.cursor = 'default'; // Restaura el cursor
        }

      });
    } catch (error) {
      console.error('Excepción al llamar al servicio:', error);
      this.cargando.set(false);
      document.body.style.cursor = 'default'; // Restaura el cursor
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

  
  async aplicarCambioDeEstado() {
    alert("Aplicar cambio de estado");
    debugger;
    const piezasSeleccionadas = this.piezasSeleccionadasSignal().filter(pieza => pieza.isSelected); // Filtrado directo
    const idNuevoEstado = this.estadoSeleccionadoSignal();
    const usuario = 'A05212';
    const idRol = 2;
  
    if (!piezasSeleccionadas || piezasSeleccionadas.length === 0) {
      alert('No hay piezas seleccionadas para cambiar de estado');
      return;
    }
  
    if (!idNuevoEstado) {
      alert('Debe seleccionar un estado válido');
      return;
    }
  
    document.body.style.cursor = 'progress';
    this.cargando.set(true);
    this.erroresCambioEstadoSignal.set([]); // Limpia los errores previos
  
    // Crea un array de promesas para manejar las solicitudes
    const solicitudes = piezasSeleccionadas.map(pieza => {
      const { IDPieza } = pieza;
  
      return this.deliveryApiService.PostAplicarCambioDeEstado(
        IDPieza,
        17,
        idNuevoEstado,
        usuario,
        idRol
      ).toPromise()
        .then((resp: any) => {
          if (!resp || resp.length === 0) {
            console.log(`Respuesta vacía para la pieza ${IDPieza}`);
            this.exitosas.update(value => value + 1);
          } else if (resp[0].Error) {
            const detalleError = resp[0].DetalleError || 'Error desconocido';
            this.agregarErrorCambioEstado(IDPieza, detalleError);
            this.fallidas.update(value => value + 1);
          } else {
            this.exitosas.update(value => value + 1);
          }
        })
        .catch((err) => {
          // Manejo explícito de errores HTTP
          const detalleError = err?.error?.DetalleError || err?.message || 'Error de red o servidor';
          this.agregarErrorCambioEstado(IDPieza, detalleError);
          this.fallidas.update(value => value + 1);
        });
    });
  
    try {
      // Espera a que todas las solicitudes se completen
      await Promise.all(solicitudes);
     
    } catch (globalError) {
      console.error('Error global durante el procesamiento:', globalError);
      alert('Ocurrió un error inesperado durante el procesamiento. Por favor, intente nuevamente.');
     
    }
  
    // Limpia las piezas seleccionadas después de procesar
    this.piezasSeleccionadasSignal.set([]);
    this.cargando.set(false);
   
    document.body.style.cursor = 'default'; // Restaura el cursor
    // Muestra el resumen
    this.mostrarResumen();
  }
  
 

 
     
  
  
  // Método para mostrar el resumen
 
  
  // Método auxiliar para agregar errores
  private agregarErrorCambioEstado(idPieza: number, detalle: string) {
    const erroresActuales = this.erroresCambioEstadoSignal();

    this.erroresCambioEstadoSignal.set([
      ...erroresActuales,
      { idPieza, detalle }
    ]);

    console.log(this.erroresCambioEstadoSignal());
  }


  onCambioSeleccionado(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      const id = parseInt(target.value, 10);
      this.estadoSeleccionadoSignal.set(isNaN(id) ? null : id);
    }
  }

  // Método para mostrar el resumen
  private mostrarResumen() {
   
    
    this.mostrarResumenOpen.set(true);
   // this.ocultarResumen = false;

    // Inicia el temporizador para difuminar el resumen
    setTimeout(() => {
      this.mostrarResumenOpen.set(false);
     // this.ocultarResumen = true;
      this.fallidas.set(0);
      this.exitosas.set(0);
    }, 8000); // 10 segundos
  }

  cerrarResumen() {
    
    this.mostrarResumenOpen.set(false);
    this.fallidas.set(0);
    this.exitosas.set(0);
  }
  
}


