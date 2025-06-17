import { Component, signal, computed, Signal, ViewChild } from '@angular/core';
import { Filtro } from '../../../core/interfaces/Filtro';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { AdvancedFiltersComponent } from "../../../features/share-components/advanced-filters/advanced-filters.component";
import { TablaPiezasComponent } from "../../../features/share-components/tabla-piezas/tabla-piezas.component";
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';
import { FiltroconsultaPieza } from '../../../core/interfaces/modelos/FiltroConsultaPieza';

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

  piezasSeleccionadasSignal: Signal<Pieza[]>;
  
  // Modal de cambio de estado
  piezaSeleccionada = signal<Pieza | null>(null);
  @ViewChild('filtrosComponent') filtrosComponent!: AdvancedFiltersComponent;

  estados = signal<string[]>([
    'Pendiente', 'En tránsito', 'Entregado', 'Devuelto', 'En custodia', 'En correo', 'En banco'
  ]);


  constructor(private piezasSeleccionadasService: PiezasSeleccionadasService) {
      this.piezasSeleccionadasSignal = this.piezasSeleccionadasService.getPiezasSeleccionadas();

      console.log('Piezas seleccionadas:', this.piezasSeleccionadasSignal());
  }

  nuevoEstado = '';

  toggleFiltro() {
    this.showFilters.update(v => !v);
  }

  onFiltroAplicado(filtro: FiltroconsultaPieza) {
    this.filtrosActivos.set(filtro);
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
    this.nuevoEstado = pieza.Estado;
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


}
