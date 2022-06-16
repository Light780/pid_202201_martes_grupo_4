using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Mascota
{
    public interface IMascota
    {
        public Task<IEnumerable<MascotaDto>> ListarMascota(int departamentoId, int especieId, int eliminado);
    }
}
