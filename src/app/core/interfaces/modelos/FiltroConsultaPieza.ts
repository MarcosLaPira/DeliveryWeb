export class FiltroconsultaPieza {
    idpieza                   : string="";
    locacion                  : string="";
    idTipoProducto            : string="";
    idSucursal                : string="";
    nombreTitular             : string="";
    identificadorPieza        : string="";
    nroSecuenciaPermisionaria : string="";
    nroSecuenciaAdministradora: string="";
    numeroCuenta              : string="";
    numeroDocumento           : string="";
    cuitcuil                  : string="";
    fechaDesde                : string="";
    fechaHasta                : string="";
    estados                   : string="";
    idMotivoNoEntrega         : string="";
    codigoDeDistribucion             : string="";
    codigoNovedad             : string="";
    idTipoDocumento           : string="";
    numeroCliente             : string="";
    estadoDesde               : string="";
    tipoCarta                 : string="";

   /*
    GetFiltroToText():string
    {
            
        var result = 
         this.idpieza                    ? "idpieza="+ this.idpieza                    +"&": ''
       + this.locacion                   ? "locacion="+ this.locacion                   +"&": ''
       + this.idTipoProducto             ? "idTipoProducto="+ this.idTipoProducto             +"&": ''
       + this.idSucursal                 ? "idSucursal="+ this.idSucursal                 +"&": ''
       + this.nombreTitular              ? "nombreTitular="+ this.nombreTitular              +"&": ''
       + this.identificadorPieza         ? "identificadorPieza="+ this.identificadorPieza         +"&": ''
       + this.nroSecuenciaPermisionaria  ? "nroSecuenciaPermisionaria="+ this.nroSecuenciaPermisionaria  +"&": ''
       + this.nroSecuenciaAdministradora ? "nroSecuenciaAdministradora="+ this.nroSecuenciaAdministradora +"&": ''
       + this.numeroCuenta               ? "numeroCuenta="+ this.numeroCuenta               +"&": ''
       + this.numeroDocumento            ? "numeroDocumento="+ this.numeroDocumento            +"&": ''                               
       + this.cuitcuil                   ? "cuitcuil="+ this.cuitcuil                   +"&": ''
       + this.fechaDesde                 ? "fechaDesde="+ this.fechaDesde                 +"&": ''
       + this.fechaHasta                 ? "fechaHasta="+ this.fechaHasta                 +"&": ''
       + this.estados                    ? "estados="+ this.estados                    +"&": ''
       + this.idMotivoNoEntrega          ? "idMotivoNoEntrega="+ this.idMotivoNoEntrega          +"&": ''
       + this.codigoNovedad              ? "codigoNovedad="+ this.codigoNovedad              +"&": ''
       + this.idTipoDocumento            ? "idTipoDocumento="+ this.idTipoDocumento            +"&": ''
       + this.numeroCliente              ? "numeroCliente="+ this.numeroCliente              +"&": ''
       + this.estadoDesde                ? "estadoDesde="+ this.estadoDesde                +"&": ''
       + this.tipoCarta                  ? "tipoCarta="+ this.tipoCarta                  +"&": ''
    
      console.log(result);
      return result;
    }
      */

    GetFiltroToText(): string {
  const result =
    (this.idpieza                    ? "idpieza=" + this.idpieza + "&" : '') +
    (this.locacion                   ? "locacion=" + this.locacion + "&" : '') +
    (this.idTipoProducto             ? "idTipoProducto=" + this.idTipoProducto + "&" : '') +
    (this.idSucursal                 ? "idSucursal=" + this.idSucursal + "&" : '') +
    (this.nombreTitular              ? "nombreTitular=" + this.nombreTitular + "&" : '') +
    (this.identificadorPieza         ? "identificadorPieza=" + this.identificadorPieza + "&" : '') +
    (this.nroSecuenciaPermisionaria  ? "nroSecuenciaPermisionaria=" + this.nroSecuenciaPermisionaria + "&" : '') +
    (this.nroSecuenciaAdministradora ? "nroSecuenciaAdministradora=" + this.nroSecuenciaAdministradora + "&" : '') +
    (this.numeroCuenta               ? "numeroCuenta=" + this.numeroCuenta + "&" : '') +
    (this.numeroDocumento            ? "numeroDocumento=" + this.numeroDocumento + "&" : '') +
    (this.cuitcuil                   ? "cuitcuil=" + this.cuitcuil + "&" : '') +
    (this.fechaDesde                 ? "fechaDesde=" + this.fechaDesde + "&" : '') +
    (this.fechaHasta                 ? "fechaHasta=" + this.fechaHasta + "&" : '') +
   // (this.estados                    ? "estados=" + this.estados + "&" : '') +
    (this.idMotivoNoEntrega          ? "idMotivoNoEntrega=" + this.idMotivoNoEntrega + "&" : '') +
    (this.codigoDeDistribucion        ? "codigoDeDistribucion=" + this.codigoDeDistribucion + "&" : '') +
    (this.codigoNovedad              ? "codigoNovedad=" + this.codigoNovedad + "&" : '') +
    (this.idTipoDocumento            ? "idTipoDocumento=" + this.idTipoDocumento + "&" : '') +
    (this.numeroCliente              ? "numeroCliente=" + this.numeroCliente + "&" : '') +
    (this.estadoDesde                ? "estadoDesde=" + this.estadoDesde + "&" : '') +
    (this.tipoCarta                  ? "tipoCarta=" + this.tipoCarta + "&" : '');

  // Elimina el último "&" si existe
  const finalResult = result.endsWith('&') ? result.slice(0, -1) : result;
  console.log(finalResult);
  return finalResult;
}

    Any():boolean
    {
            return true;
    }

    
}