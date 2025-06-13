import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-andreani',
  templateUrl: './modal-andreani.component.html',
  styleUrls: ['./modal-andreani.component.css']
})
export class ModalAndreaniComponent {
  @Input() estados: { estado: string; fecha: string }[] = [];
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  cerrar() {
    this.close.emit();
  }
}
