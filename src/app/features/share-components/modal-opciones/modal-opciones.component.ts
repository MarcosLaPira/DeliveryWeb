import { Component, Input, Output, EventEmitter, Signal } from '@angular/core';

@Component({
  selector: 'app-modal-opciones',
  templateUrl: './modal-opciones.component.html',
  standalone: true,
  imports: [],
})
export class ModalOpcionesComponent {
  @Input() modalAbierto: boolean = false; // Recibe si el modal está abierto
  @Output() cerrarModalEvent = new EventEmitter<void>(); // Emite el evento para cerrar el modal

  cerrarModal() {
    this.cerrarModalEvent.emit(); // Al cerrar, emite el evento
  }
}
