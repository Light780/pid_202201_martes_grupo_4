using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Dto
{
    public class UsuarioDto
    {
        public int UsuarioId { get; set; }
        public string UserName { get; set; }        
        public string NombreCompleto { get; set; }        
        public string Email { get; set; }                
        public string FotoPerfil { get; set; }        
    }
}
