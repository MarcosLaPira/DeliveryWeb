import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appEstadoRescate',
})
export class EstadoRescatePipe implements PipeTransform {

  transform(value: string | null): string {
    if (value === null || value === '') return 'Sin estado de rescate';

    const estadoId = Number(value); // casteamos el string a número

    const estados: Record<number, string> = {
      1: 'Generado Rescate',
      2: 'Generado Reenvio',
      3: 'Enviado Pedido Rescate',
      4: 'Enviado Pedido Reenvio',
      5: 'Recibido Rescate Perm.',
      6: 'Recibido Reenvio Perm.',
      7: 'Fin Rescate o Reenvio'
    };

    return estados[estadoId] || `Estado desconocido (${value})`;
  }

}
