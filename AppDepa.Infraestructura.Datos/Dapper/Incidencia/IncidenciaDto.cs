using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Incidencia
{
    public class IncidenciaDto
    {
        public int IncidenciaId { get; set; }
        public string CodigoIncidencia { get; set; }
        public string Departamento { get; set; }
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
