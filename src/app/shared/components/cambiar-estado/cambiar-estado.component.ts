import { Component, signal, computed } from '@angular/core';
import { Filtro } from '../../../core/interfaces/Filtro';
import { Pieza } from '../../../core/interfaces/Pieza';
import { AdvancedFiltersComponent } from "../../../features/share-components/advanced-filters/advanced-filters.component";

@Component({
  selector: 'app-cambiar-estado',
  templateUrl: './cambiar-estado.component.html',
  styleUrl: './cambiar-estado.component.css',
  imports: [AdvancedFiltersComponent]
})
export class CambiarEstadoComponent {
  // Datos de ejemplo (puedes reemplazar por fetch real)
  piezasSignal = signal<Pieza[]>([
    { idPieza: '00001', administradora: 'Admin 1', permisionaria: 'Permi 1', estado: 'Pendiente', dni: '12345678', idcobis: 'CB001', numeroTarjeta: '4111111111111111', fechaProceso: '2025-04-10', fechaCambioEstado: '2025-04-11', coordenadas: '-34.6037,-58.3816' },
    { idPieza: '00002', administradora: 'Admin 2', permisionaria: 'Permi 2', estado: 'En tránsito', dni: '87654321', idcobis: 'CB002', numeroTarjeta: '4222222222222222', fechaProceso: '2025-04-09', fechaCambioEstado: '2025-04-10', coordenadas: '-34.6158,-58.4333' },
    { idPieza: '00003', administradora: 'Admin 3', permisionaria: 'Permi 3', estado: 'Entregado', dni: '11223344', idcobis: 'CB003', numeroTarjeta: '4333333333333333', fechaProceso: '2025-04-08', fechaCambioEstado: '2025-04-09', coordenadas: '-34.6025,-58.4483' },
  ]);

  showFilters = signal(false);
  filtrosActivos = signal<Filtro>({});

  filasPorPaginaSignal = signal(10);
  currentPageSignal = signal(1);

  piezasPaginadas = computed(() => {
    const todas = this.piezasSignal();
    const pageSize = this.filasPorPaginaSignal();
    const page = this.currentPageSignal();
    const start = (page - 1) * pageSize;
    return todas.slice(start, start + pageSize);
  });

  totalPagesSignal = computed(() =>
    Math.ceil(this.piezasSignal().length / this.filasPorPaginaSignal())
  );

  // Etiquetas de filtros activos
  getFiltrosActivosVisibles = computed(() => {
    return Object.entries(this.filtrosActivos()).filter(([_, valor]) => {
      if (Array.isArray(valor)) return valor.length > 0;
      return valor !== null && valor !== undefined && valor !== '';
    });
  });

  // Modal de cambio de estado
  piezaSeleccionada = signal<Pieza | null>(null);
  nuevoEstado = '';
  estadosDisponibles = ['Pendiente', 'En tránsito', 'Entregado', 'Devuelto', 'En custodia', 'En correo', 'En banco'];

  toggleFiltro() {
    this.showFilters.update(v => !v);
  }

  onFiltroAplicado(filtro: Filtro) {
    this.filtrosActivos.set(filtro);
  }

  onFiltroEliminado(key: string) {
    this.quitarFiltro(key as keyof Filtro);
  }

  quitarFiltro(clave: keyof Filtro) {
    const copia = structuredClone(this.filtrosActivos());
    const valor = copia[clave];
    if (Array.isArray(valor)) {
      (copia[clave] as any) = [];
    } else {
      (copia[clave] as any) = '';
    }
    this.filtrosActivos.set(copia);
    // Aquí podrías resetear el filtro en el hijo si lo necesitas
    this.onFiltroAplicado(this.filtrosActivos());
  }

  onLimpiarTodos() {
    this.filtrosActivos.set({});
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
    this.nuevoEstado = pieza.estado;
  }

  confirmarCambioEstado() {
    const pieza = this.piezaSeleccionada();
    if (pieza) {
      // Actualiza el estado en el array de piezas
      const piezas = this.piezasSignal().map(p =>
        p.idPieza === pieza.idPieza ? { ...p, estado: this.nuevoEstado } : p
      );
      this.piezasSignal.set(piezas);
      this.piezaSeleccionada.set(null);
    }
  }

  cancelarCambioEstado() {
    this.piezaSeleccionada.set(null);
  }
}
