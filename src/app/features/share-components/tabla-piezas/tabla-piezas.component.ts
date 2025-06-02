import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { Pieza } from '../../../core/interfaces/Pieza';

@Component({
  selector: 'app-tabla-piezas',
  imports: [],
  templateUrl: './tabla-piezas.component.html',
  styleUrl: './tabla-piezas.component.css'
})
export class TablaPiezasComponent {

  @Input() piezas: Pieza[] = [];
  @Input() filasPorPagina = 10;
  currentPage = signal(1);

  piezasPaginadas = computed(() => {
  const start = (this.currentPage() - 1) * this.filasPorPagina;
  return this.piezas.slice(start, start + this.filasPorPagina);
});

  @Output() piezaSeleccionada = new EventEmitter<Pieza>();

  abrirModal(pieza: Pieza) {
    this.piezaSeleccionada.emit(pieza);
  }

}
