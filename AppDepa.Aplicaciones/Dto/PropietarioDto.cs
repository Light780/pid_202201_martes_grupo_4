using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Dto
{
    public class PropietarioDto
    {
        public int PropietarioId { get; set; }
        public string Titular { get; set; }
        public string Documento { get; set; }
        // Primer param
        public string TipoDocumentoParam { get; set; }
        public string Telefono { get; set; }
        // Segundo Param
        public string EstadoPropietarioParam { get; set; }
        public string Correo { get; set; }
        public int CantidadFamiliares { get; set; }
        public int CantidadMascotas { get; set; }
        public int CantidadPosibleVisita { get; set; }
    }
}
