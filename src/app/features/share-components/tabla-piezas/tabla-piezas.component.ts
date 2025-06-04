import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pieza } from '../../../core/interfaces/Pieza';

@Component({
  selector: 'app-tabla-piezas',
  imports: [],
  templateUrl: './tabla-piezas.component.html',
  styleUrl: './tabla-piezas.component.css'
})
export class TablaPiezasComponent {

  @Input() piezas: Pieza[] = [];

  @Output() piezaSeleccionada = new EventEmitter<Pieza>();

  abrirModal(pieza: Pieza) {
    this.piezaSeleccionada.emit(pieza);
  }

}
