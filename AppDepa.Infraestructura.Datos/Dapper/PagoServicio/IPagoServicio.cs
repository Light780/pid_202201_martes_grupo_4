using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.PagoServicio
{
    public interface IPagoServicio
    {
        public Task<IEnumerable<PagoServicioDto>> ListarPagos(int boletaId);
    }
}
