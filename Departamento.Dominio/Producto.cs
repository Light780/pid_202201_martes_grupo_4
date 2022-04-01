﻿using System;
using System.Collections.Generic;

namespace AppDepa.Dominio
{
    public class Producto
    {
        public Guid productoId { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public decimal costo { get; set; }
        public decimal precio { get; set; }
        public decimal cantidadEnStock { get; set; }

        /* Detalle de la venta */
        public List<VentaDetalle> VentaDetalles { get; set; }
    }
}
