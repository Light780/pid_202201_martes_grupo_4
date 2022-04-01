using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio.Interfaces
{
    public interface IListar<TEntidad, TEntidadID>
    {
        List<TEntidad> Listar();

        TEntidad SeleccionarPorID(TEntidadID entidadId);
    }
}
