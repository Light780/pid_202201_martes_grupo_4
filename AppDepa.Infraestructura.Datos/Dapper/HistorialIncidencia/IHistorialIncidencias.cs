using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.HistorialIncidencia
{
    public interface IHistorialIncidencias
    {
        public Task<IEnumerable<HistorialIncidenciaDto>> ListarHistorialIndicencia(int departamentoId);
    }
}
