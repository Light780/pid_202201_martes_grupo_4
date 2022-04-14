using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Dto
{
    public class PersonaDto
    {
        public int PersonaId { get; set; }        
        public string NombreCompleto { get; set; }        
        public string Documento { get; set; }
        public string TipoDocumento { get; set; }        
        public string Telefono { get; set; }
        public string Estado { get; set; }        
        public string Correo { get; set; }        
        public string Sexo { get; set; }
        public string TipoPersona { get; set; }
        public string Departamento { get; set; }
    }
}
