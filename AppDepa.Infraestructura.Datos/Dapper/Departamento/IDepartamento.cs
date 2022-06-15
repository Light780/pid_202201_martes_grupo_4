using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Departamento
{
    public interface IDepartamento
    {
        public Task<IEnumerable<DepartamentoDto>> ListarDepartamento(int tipoDepaId, int eliminado);
    }
}
