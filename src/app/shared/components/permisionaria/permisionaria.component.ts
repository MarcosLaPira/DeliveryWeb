import { Component, signal, computed, EventEmitter, Signal } from '@angular/core';
import { EstadoTarjeta } from './estado-tarjeta.model';
import { TablaPiezasComponent } from '../../../features/share-components/tabla-piezas/tabla-piezas.component';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';
import { ModalAndreaniComponent } from './modal-andreani.component';

@Component({
  selector: 'app-permisionaria',
  imports: [ModalAndreaniComponent],
  templateUrl: './permisionaria.component.html',
  styleUrl: './permisionaria.component.css'
})
export class PermisionariaComponent {

  piezasSeleccionadasSignal: Signal<Pieza[]>;
  modalAndreaniAbierto = signal(false);
  estadosAndreaniSeleccionados: { estado: string; fecha: string }[] = [];
  filtroEmpresa = signal('');
  filtroEstadoInterno = signal('');
  filtroEstadoAndreani = signal('');
  
  empresasDisponibles = signal<string[]>([
    'Andreani', 'Rapi Pago', 'OCA'
  ]);
  
  constructor(private piezasSeleccionadasService: PiezasSeleccionadasService) {
    this.piezasSeleccionadasSignal = this.piezasSeleccionadasService.getPiezasSeleccionadas();
  }

  
 

  estadosInternosDisponibles = computed(() => Array.from(new Set(this.tarjetasSignal().map(t => t.estadoInterno))));
  estadosAndreaniDisponibles = computed(() => Array.from(new Set(this.tarjetasSignal().map(t => t.estadoAndreani))));

  abrirModalAndreani(tarjeta: any) {
    // Simulación de historial de estados de Andreani
    this.estadosAndreaniSeleccionados = [
      { estado: 'En tránsito', fecha: '2025-06-01' },
      { estado: 'En sucursal', fecha: '2025-06-03' },
      { estado: 'Entregado', fecha: '2025-06-05' }
    ];
    // En un caso real, aquí llamarías a un servicio para obtener el historial
    this.modalAndreaniAbierto.set(true);
  }

  cerrarModalAndreani() {
    this.modalAndreaniAbierto.set(false);
    this.estadosAndreaniSeleccionados = [];
  }

  // Simulación de datos (en la práctica, esto vendría de una API)
 


  tarjetasFiltradas = computed(() => {
    return this.tarjetasSignal().filter(t =>
   //   (!this.filtroEmpresa() || t.empresa === this.filtroEmpresa()) &&
      (!this.filtroEstadoInterno() || t.estadoInterno === this.filtroEstadoInterno()) &&
      (!this.filtroEstadoAndreani() || t.estadoAndreani === this.filtroEstadoAndreani())
    );
  });

  // Computed que transforma la señal de piezas en "tarjetas" con estado interno y Andreani
  tarjetasSignal = computed(() => {

    if (!this.piezasSeleccionadasSignal) return [];

    return this.piezasSeleccionadasSignal().map(pieza => ({
      id: pieza.IDPieza,
     // empresa: pieza.permisionaria || 'Desconocida',
      estadoInterno: pieza.Estado,
      estadoAndreani: this.simularEstadoAndreani(pieza),
      fecha: pieza.Fecha || '',
    }));

  });

  // Simulación de consulta a Andreani
  private simularEstadoAndreani(pieza: Pieza): string {
    // Simula el estado en Andreani según el idPieza (puedes mejorar la lógica)
    const estados = ['En tránsito', 'En sucursal', 'Entregado', 'Demorado', 'No encontrado'];
    const idx = parseInt(String(pieza.IDPieza).replace(/\D/g, ''), 10) % estados.length;
    return estados[idx];
  }


  onEmpresaChange(event: Event) {
    const value = (event.target as HTMLSelectElement)?.value || '';
    this.filtroEmpresa.set(value);
  }
  onEstadoInternoChange(event: Event) {
    const value = (event.target as HTMLSelectElement)?.value || '';
    this.filtroEstadoInterno.set(value);
  }
  onEstadoAndreaniChange(event: Event) {
    const value = (event.target as HTMLSelectElement)?.value || '';
    this.filtroEstadoAndreani.set(value);
  }
}
