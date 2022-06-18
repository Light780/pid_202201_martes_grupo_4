using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Incidencia
{
    public interface IIncidencia
    {
        public Task<IEnumerable<IncidenciaDto>> ListarIncidencia(int departamentoId, int tipoIncidenciaId, int estadoIncidenciaId, int eliminado);
    }
}
