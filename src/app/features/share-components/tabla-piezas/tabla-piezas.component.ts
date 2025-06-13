import { Component, Input, Output, Signal, output } from '@angular/core';
import { Pieza } from '../../../core/interfaces/Pieza';

@Component({
  selector: 'app-tabla-piezas',
  imports: [],
  templateUrl: './tabla-piezas.component.html',
  styleUrl: './tabla-piezas.component.css'
})
export class TablaPiezasComponent {

  @Input() piezas!: Signal<Pieza[]>;

  // Angular 17+/19: output signals deben declararse como propiedades de clase, no en el constructor ni como métodos
  piezaSeleccionadaSig = output<Pieza>();
  seleccionMasivaSig = output<string[]>();

  selectedIds: Set<string> = new Set();

  constructor() {}

  get allSelected(): boolean {
    return this.piezas() && this.piezas().length > 0 && this.piezas().every(p => this.selectedIds.has(p.idPieza));
  }

  isSelected(pieza: Pieza): boolean {
    return !!pieza.isSelected;
  }

  toggleSeleccion(pieza: Pieza, event: Event) {
    event.stopPropagation();
    pieza.isSelected = !pieza.isSelected;
    if (pieza.isSelected) {
      this.selectedIds.add(pieza.idPieza);
    } else {
      this.selectedIds.delete(pieza.idPieza);
    }
  }

  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.piezas().forEach(p => {
      p.isSelected = checked;
      if (checked) {
        this.selectedIds.add(p.idPieza);
      } else {
        this.selectedIds.delete(p.idPieza);
      }
    });
  }

  abrirModal(pieza: Pieza) {
    this.piezaSeleccionadaSig.emit(pieza);
  }

  emitirSeleccionMasiva() {
    const ids = this.piezas().filter(p => p.isSelected).map(p => p.idPieza);
     this.seleccionMasivaSig.emit(ids);
  }

}
