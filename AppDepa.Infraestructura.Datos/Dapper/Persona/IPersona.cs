using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Persona
{
    public interface IPersona
    {
        public Task<IEnumerable<PersonaDto>> ListarPersona(int departamentoId, int tipoPersonaId, int eliminado);
    }
}
