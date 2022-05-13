using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Dto
{
    public class VisitaDto
    {
        public int VisitaId { get; set; }
        public string PersonaVisita { get; set; }
        public string Persona { get; set; }
        public string FechaEntrada { get; set; }
        public string FechaSalida { get; set; }
        public string FechaRegistro { get; set; }
        public string Usuario { get; set; }
        public string Comentario { get; set; }

        public string Estado { get; set; }

    }
}
