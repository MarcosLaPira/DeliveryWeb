import { Routes } from '@angular/router';
import { ConsultarPiezaComponent } from './shared/components/consultar-pieza/consultar-pieza.component';
import { CambiarEstadoComponent } from './shared/components/cambiar-estado/cambiar-estado.component';
import { ReportesFacturacionComponent } from './shared/components/reportes-facturacion/reportes-facturacion.component';
import { PantallaPrincipalComponent } from './shared/components/pantalla-principal/pantalla-principal.component';
import { PermisionariaComponent } from './shared/components/permisionaria/permisionaria.component';
import { MapasComponent } from './shared/components/mapas/mapas.component';

export const appRoutes: Routes = [
  { path: 'pantalla-principal', component: PantallaPrincipalComponent },
  { path: 'consultar-pieza', component: ConsultarPiezaComponent },
  { path: 'cambiar-estado', component: CambiarEstadoComponent },
  { path: 'reportes-facturacion', component: ReportesFacturacionComponent },
  { path: 'permisionaria', component: PermisionariaComponent },
  { path: 'mapa', component: MapasComponent },
  { path: '', redirectTo: '/consultar-pieza', pathMatch: 'full' }, // Redirige por defecto a consultar-pieza
];
