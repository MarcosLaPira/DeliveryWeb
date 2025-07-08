import { Component, computed, effect, input, signal, ViewChild } from '@angular/core';
import { ModalOpcionesComponent } from '../../../features/share-components/modal-opciones/modal-opciones.component';
import { AdvancedFiltersComponent } from '../../../features/share-components/advanced-filters/advanced-filters.component';
import { TablaPiezasComponent } from '../../../features/share-components/tabla-piezas/tabla-piezas.component';
import { Filtro } from '../../../core/interfaces/Filtro';
import { ActivatedRoute, Router } from '@angular/router';
import { PermisionariaComponent } from '../permisionaria/permisionaria.component';
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';

import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { FiltroconsultaPieza } from '../../../core/interfaces/modelos/FiltroConsultaPieza';
import { HistorialPiezaModalComponent } from '../../../features/share-components/HistorialPiezaModal/HistorialPiezaModal.component';
import { historia } from '../../../core/interfaces/modelos/Historia';


import * as XLSX from 'xlsx';

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
    private deliveryApiService: DeliveryApiService,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit() {
     
    debugger;
    document.body.style.cursor = 'progress';
    const url = window.location.search;
    const params = new URLSearchParams(url);


    
    const idPieza = this.route.snapshot.paramMap.get('idPieza'); // esto toma /consultar-pieza/123

    if (idPieza) {
      // Buscar pieza individual (modo ficha)
      const pieza = this.piezasSeleccionadasService.getUltimaPieza();
      console.log("🚀 ~ ConsultarPiezaComponent ~ ngOnInit ~ pieza:", pieza)
      if (pieza != null /*&& pieza.IDPieza === Number(idPieza)*/) {
        console.log("🚀 ~ ConsultarPiezaComponent ~ ngOnInit ~ pieza2:", pieza)

        this.piezas.set([pieza]);
        
        console.log("🚀 ~ ConsultarPiezaComponent ~ ngOnInit ~ piezas:", )
        document.body.style.cursor = 'default';
        return;

      }

      /*
      // Si no estaba en memoria, pedila al back
      this.deliveryApiService.GetPieza(idPieza).subscribe({
        next: (pieza) => {
          this.piezas.set([pieza]);
          document.body.style.cursor = 'default';
        },
        error: () => {
          document.body.style.cursor = 'default';
        }
      });
      */

      document.body.style.cursor = 'default';
      return;
    }


    // Verifica si hay un ID en los parámetros de la URL desde el dashboard
    if (params.get('id') === '1') {//piezas en transito
   
      this.cargando.set(true);
      this.deliveryApiService.GetPieza('fechaDesde=2025-05-01&fechaHasta=2025-07-8&estados=160, 170, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 99, 100, 101, 69, 27, 106, 203, 31, 23, 4, 5, 6, 21').subscribe({
        next: (piezas) => {
          this.piezas.set(piezas);
          this.cargando.set(false);
          this.piezasSeleccionadasService.setPiezasCargadas(piezas);
        },
        error: () => {
          this.cargando.set(false);
        },
        complete: () => {
         
          this.cargando.set(false);
          document.body.style.cursor = 'default'; // Restaura el cursor
        }

      });
      return;

    }else  if (params.get('id') === '2') {
        this.cargando.set(true);
      this.deliveryApiService.GetPieza('fechaDesde=2025-05-01&fechaHasta=2025-07-8&estados=55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 10, 68, 98, 97, 102, 103, 8, 12, 18').subscribe({
        next: (piezas) => {
          this.piezas.set(piezas);
          this.cargando.set(false);
          this.piezasSeleccionadasService.setPiezasCargadas(piezas);
        },
        error: () => {
          this.cargando.set(false);
        },
        complete: () => {
          this.cargando.set(false);
          document.body.style.cursor = 'default'; // Restaura el cursor
        }
      });
      return;
    }else  if (params.get('id') === '3') {
        this.cargando.set(true);
      this.deliveryApiService.GetPieza('fechaDesde=2025-05-01&fechaHasta=2025-07-8&estados=19, 7, 11, 44, 210, 105, 70, 95, 17, 200, 201, 202').subscribe({
        next: (piezas) => {
          this.piezas.set(piezas);
          this.cargando.set(false);
          this.piezasSeleccionadasService.setPiezasCargadas(piezas);
        },
        error: () => {
          this.cargando.set(false);
        },
        complete: () => {
          this.cargando.set(false);
          document.body.style.cursor = 'default'; // Restaura el cursor
        }
      });
      return;
    }else  if (params.get('id') === '4') {
      this.cargando.set(true);
    this.deliveryApiService.GetPieza('fechaDesde=2025-05-01&fechaHasta=2025-07-8').subscribe({
      next: (piezasRecibidas) => {

        const estadosRescate = ['1','2','3','4','5','6'];
        this.piezas.set(piezasRecibidas.filter(pieza => estadosRescate.includes(pieza.IDEstadoRescate)));

        this.cargando.set(false);
        this.piezasSeleccionadasService.setPiezasCargadas(piezasRecibidas);
      },
      error: () => {
        this.cargando.set(false);
      },
      complete: () => {
        this.cargando.set(false);
        document.body.style.cursor = 'default'; // Restaura el cursor
      }
    });
    return;
  }
  
    
    
    const piezasGuardadas = this.piezasSeleccionadasService.getPiezasCargadas();
    if (piezasGuardadas.length > 0) {
      this.piezas.set(piezasGuardadas);
    } else {
      // cargar normalmente desde la API
    }

    document.body.style.cursor = 'default';
      
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
    document.body.style.cursor = 'progress';
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
    document.body.style.cursor = 'progress';
    this.deliveryApiService.Gethistoria(idPieza).subscribe({
      next: (historias) => {
        this.historialPieza.set(historias);
        this.cargando.set(false);
      },
      error: (err) => {
        this.cargando.set(false);
        alert('Error al obtener historial');
      },
      complete: () => {
        console.log('Llamada al servicio de historial completada');
        this.cargando.set(false);
        document.body.style.cursor = 'default'; // Restaura el cursor
      }
    });
  }

  cerrarHistorial() {
    this.historialPieza.set(null);
  }

  emitirReporteDeFacturacion() {
     const piezasSeleccionadas = this.piezas().filter((p) => p.isSelected);
    if (piezasSeleccionadas.length === 0) {
      alert('Selecciona al menos una pieza para cambiar el estado');
      return;
    }

    // Emitir el cambio de estado
    this.piezasSeleccionadasService.setPiezasSeleccionadas(piezasSeleccionadas);
    this.router.navigate(['/reportes-facturacion']);
  }

  obtenerSucursales() {
      console.log("obtner sucus");
      this.deliveryApiService.getCatalogoProductos().subscribe(resultados => console.log(resultados));
    }

  // Efecto para cambiar el cursor global

  /*
  ngAfterViewChecked() {
    const url = this.router.url;
    const params = new URLSearchParams(url.split('?')[1] || '');
   
    debugger;
    if (params.get('en') === 'transito') {
      // Solo llama si aún no hay piezas cargadas
      if (this.piezas().length === 0) {
        this.cargando.set(true);
        this.deliveryApiService.GetPieza('enTransito=true').subscribe({
          next: (piezas) => {
            this.piezas.set(piezas);
            this.cargando.set(false);
            this.piezasSeleccionadasService.setPiezasCargadas(piezas);
          },
          error: () => {
            this.cargando.set(false);
          }
        });
      }
    }
  }
    */

 exportarPiezasAExcel() {
  const piezas = this.piezas();
  if (!piezas || piezas.length === 0) {
    alert('No hay piezas para exportar');
    return;
  }
  // Exporta todos los datos disponibles de cada pieza
  const data = piezas.map(p => ({ ...p }));
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  // Obtener el rango de la hoja
  const range = XLSX.utils.decode_range(ws['!ref']!);
  // Estilo para la cabecera (azul oscuro, blanco, negrita)
  const headerStyle = {
    fill: { patternType: 'solid', fgColor: { rgb: '1E293B' } }, // azul oscuro
    font: { bold: true, color: { rgb: 'FFFFFF' } }
  };
  // Estilos para filas alternas
  const rowStyle1 = { fill: { patternType: 'solid', fgColor: { rgb: 'FFFFFF' } } }; // blanco
  const rowStyle2 = { fill: { patternType: 'solid', fgColor: { rgb: 'E0F2FE' } } }; // celeste claro
  // Aplicar estilo a la cabecera
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell_address = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!ws[cell_address]) continue;
    ws[cell_address].s = headerStyle;
  }
  // Aplicar estilos alternos a las filas de datos
  for (let R = 1; R <= range.e.r; ++R) {
    const style = (R % 2 === 0) ? rowStyle1 : rowStyle2;
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
      if (!ws[cell_address]) continue;
      ws[cell_address].s = style;
    }
  }
  // Ajustar ancho de columnas automáticamente
  const cols = Object.keys(data[0] || {}).map(key => ({ wch: Math.max(12, key.length + 2) }));
  ws['!cols'] = cols;
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Piezas');
  XLSX.writeFile(wb, 'piezas.xlsx');
}
}
