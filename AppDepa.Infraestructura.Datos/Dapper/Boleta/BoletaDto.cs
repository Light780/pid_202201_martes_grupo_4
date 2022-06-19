using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Boleta
{
    public class BoletaDto
    {
        public int BoletaId { get; set; }
        public string Servicio { get; set; }
        public string Departamento { get; set; }
        public string Periodo { get; set; }
        public string CodigoPago { get; set; }
        public decimal Monto { get; set; }
        public decimal? Saldo { get; set; }
        public string Usuario { get; set; }
        public string FechaPago { get; set; }
        public string Estado { get; set; }
        public string FechaRegistro { get; set; }
    }
}
