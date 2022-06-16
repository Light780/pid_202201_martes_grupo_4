using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Boleta
{
    public interface IBoleta
    {
        Task<IEnumerable<BoletaDto>> ListarBoleta(string anio, int departamentoId, int estadoId);
    }
}
