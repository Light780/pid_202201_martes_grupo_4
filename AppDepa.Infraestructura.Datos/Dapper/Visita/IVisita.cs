using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Visita
{
    public interface IVisita
    {
        public Task<IEnumerable<VisitaDto>> ListarVisita(string nombreCompleto, string documento, int estadoId);
    }
}
