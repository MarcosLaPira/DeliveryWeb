import { Injectable, signal, Signal } from '@angular/core';
import { Pieza } from '../interfaces/modelos/Pieza';


@Injectable({ providedIn: 'root' })
export class PiezasSeleccionadasService {
    
  private readonly piezasSeleccionadasSignal = signal<Pieza[]>([]);
  private ultimaPiezaDesdeDashboard = signal<Pieza | null>(null);

  setUltimaPieza(pieza: Pieza) {
    this.ultimaPiezaDesdeDashboard.set(pieza);
  }

  getUltimaPieza(): Pieza | null {
    return this.ultimaPiezaDesdeDashboard();
  }

  
  private piezasMapas: Pieza[] = [];

   private piezasCargadas: Pieza[] = [];

  setPiezasCargadas(piezas: Pieza[]) {
    this.piezasCargadas = piezas;
  }

  getPiezasCargadas(): Pieza[] {
    return this.piezasCargadas;
  }

  setPiezasSeleccionadas(piezas: Pieza[]) {
    this.piezasSeleccionadasSignal.set(piezas);
  }

  getPiezasSeleccionadas(): Signal<Pieza[]> {
    return this.piezasSeleccionadasSignal.asReadonly();
  }

  setPiezasMapas(piezas: Pieza[]) {
    console.log('Piezas seleccionadas servicio:', piezas);
    this.piezasMapas = piezas || [];
  }

  getPiezasMapas(): Pieza[] {
      console.log('Piezas para devolvcer servicio:', this.piezasMapas);
    return this.piezasMapas;
  }
}
