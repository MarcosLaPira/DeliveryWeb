import { ChangeDetectionStrategy, Component, EventEmitter, Input, output, Output } from '@angular/core';

@Component({
  selector: 'app-historial-pieza-modal',
  imports: [],
  template: `<p>HistorialPiezaModal works!</p>`,
   templateUrl: 'historialPiezaModalComponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistorialPiezaModalComponent {
  @Input() historial: any[] | null = null;
  cerrar = output<void>() //new EventEmitter<void>();
  
}
