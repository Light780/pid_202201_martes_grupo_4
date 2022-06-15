using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Dto
{
    public class HistorialIncidenciaDto
    {
        //Datos de la Incidencia
        public int HistorialIncidenciaId { get; set; }
        public string CodigoIncidencia { get; set; }
        public string NroDepartamento { get; set; }
        public string TipoDepartamento { get; set; }
        public string TipoIncidencia { get; set; }
        public string DescripcionIncidencia { get; set; }
        public string EstadoIncidencia { get; set; }
        public string FechaIncidencia { get; set; }
        //Usuario
        public string UsuarioRegistro { get; set; }
        public string FechaRegistro { get; set; }
        //Informante
        public string Informante { get; set; }
    }
}
